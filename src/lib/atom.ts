import { atom } from "jotai";
import { moveCaretToBlock } from "./utils";
import { blockIdDataMap, insertBlock2Map } from "./blockStore";
import { BlockData, BlockTypeEnum } from "./typing";

const blockIdsAtom = atom<string[]>([]);

// 当前聚焦的block的id
const curFocusedBlockIdAtom = atom<string | null>(null);
// 是否锁定文章
const lockedAtom = atom(false);
const changedAtom = atom(false);

// writeOnlyAtom, 将文章设置成已修改状态
const setChangedTrueAtom = atom(null, (get, set) => {
  const changed = get(changedAtom);
  if (changed) return;
  set(changedAtom, true);
});

// writeOnlyAtom, 用于插入新的block
const insertBlockAtom = atom(
  null,
  (
    get,
    set,
    update: {
      id: string;
      data?: string | BlockData;
    },
  ) => {
    const locked = get(lockedAtom);
    if (locked) return;
    set(changedAtom, true);
    const blockIds = get(blockIdsAtom);
    const curFocusedBlockId = get(curFocusedBlockIdAtom);
    for (const [idx, blockId] of blockIds.entries()) {
      if (blockId !== curFocusedBlockId) continue;
      insertBlock2Map(blockId, update);
      if (update.data && typeof update.data !== "string") {
        set(blockIdsAtom, (prev) => {
          const newIds = Array.from(prev);
          newIds[idx] = update.id;
          return newIds;
        });
      } else {
        set(blockIdsAtom, (prev) => prev.toSpliced(idx + 1, 0, update.id));
      }
      set(curFocusedBlockIdAtom, update.id);
      return;
    }
  },
);

// writeOnlyAtom, 用于移除当前聚焦的block，并将当前block的内容追加到前一个block的末尾
const removeBlockAtom = atom(
  null,
  (get, set, update: { appendToPrevBlockText: string | null }) => {
    const locked = get(lockedAtom);
    if (locked) return;
    const blockIds = get(blockIdsAtom);
    const curFocusedBlockId = get(curFocusedBlockIdAtom);
    if (!curFocusedBlockId) return;
    const idx = blockIds.findIndex((id) => id === curFocusedBlockId);
    // 要保证至少有主标题block
    if (idx < 1) return;
    set(changedAtom, true);
    const curBlockData = blockIdDataMap.get(curFocusedBlockId);
    if (curBlockData?.type === BlockTypeEnum.List) {
      const newId = crypto.randomUUID();
      blockIdDataMap.delete(curFocusedBlockId);
      blockIdDataMap.set(newId, {
        type: BlockTypeEnum.Text,
        initialContent: update.appendToPrevBlockText ?? "",
      });
      set(curFocusedBlockIdAtom, newId);
      set(blockIdsAtom, (prev) => {
        const clonedIds = Array.from(prev);
        clonedIds[idx] = newId;
        return clonedIds;
      });
      return;
    }
    const prevBlockId = blockIds[idx - 1];
    set(blockIdsAtom, (prev) => prev.toSpliced(idx, 1));
    set(curFocusedBlockIdAtom, prevBlockId);
    // 将光标移动到prevBlock，并将内容追加到prevBlock的末尾
    moveCaretToBlock(
      document.getElementById(prevBlockId),
      "insert",
      update.appendToPrevBlockText,
    );
  },
);

/** readWriteAtom */
export { blockIdsAtom, curFocusedBlockIdAtom, lockedAtom, changedAtom };
/** writeOnlyAtom */
export { insertBlockAtom, removeBlockAtom, setChangedTrueAtom };
