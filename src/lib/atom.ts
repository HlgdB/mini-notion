import { atom } from "jotai";
import { moveCaretToBlock } from "./utils";
import { blockIdDataMap, insertBlock2Map } from "./blockStore";
import { BlockTypeEnum } from "./typing";

const blockIdsAtom = atom<string[]>([]);

// 当前聚焦的block的id
const curFocusedBlockIdAtom = atom<string | null>(null);
// 是否锁定文章
const lockedAtom = atom(false);

// writeOnlyAtom, 用于插入新的block
const insertBlockAtom = atom(
  null,
  (get, set, update: { id: string; content: string }) => {
    const locked = get(lockedAtom);
    if (locked) return;
    const blockIds = get(blockIdsAtom);
    const curFocusedBlockId = get(curFocusedBlockIdAtom);
    for (const [idx, blockId] of blockIds.entries()) {
      if (blockId !== curFocusedBlockId) continue;
      insertBlock2Map(blockId, update.id, update.content);
      set(blockIdsAtom, (prev) => prev.toSpliced(idx + 1, 0, update.id));
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
    // 要保证除了主标题外的至少有一个block
    if (idx < 2) return;
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
export { blockIdsAtom, curFocusedBlockIdAtom, lockedAtom };
/** writeOnlyAtom */
export { insertBlockAtom, removeBlockAtom };
