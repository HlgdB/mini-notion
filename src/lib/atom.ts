import { atom } from "jotai";

import { type Block, BlockTypeEnum } from "./typing";
import { moveCaretToBlock } from "./utils";

const blocksAtom = atom<Block[]>([
  {
    id: crypto.randomUUID(),
    type: BlockTypeEnum.Text,
    content: "Hello World",
  },
]);

// 当前聚焦的block的id
const curFocusedBlockIdAtom = atom<string | null>(null);

// writeOnlyAtom, 用于插入新的block
const insertBlockAtom = atom(
  null,
  (get, set, update: { id: string; content: string }) => {
    const blocks = get(blocksAtom);
    const curFocusedBlockId = get(curFocusedBlockIdAtom);
    for (const [idx, block] of blocks.entries()) {
      if (block.id !== curFocusedBlockId) continue;
      set(blocksAtom, () =>
        blocks.toSpliced(idx + 1, 0, {
          ...update,
          type: block.type,
        }),
      );
      set(curFocusedBlockIdAtom, update.id);
      return;
    }
  },
);

// writeOnlyAtom, 用于移除当前聚焦的block，并将当前block的内容追加到前一个block的末尾
const removeBlockAtom = atom(
  null,
  (get, set, update: { appendToPrevBlockText: string | null }) => {
    const blocks = get(blocksAtom);
    const curFocusedBlockId = get(curFocusedBlockIdAtom);
    if (!curFocusedBlockId) return;
    const idx = blocks.findIndex((block) => block.id === curFocusedBlockId);
    if (idx < 1) return;
    const { id: prevBlockId } = blocks[idx - 1];
    set(blocksAtom, blocks.toSpliced(idx, 1));
    set(curFocusedBlockIdAtom, prevBlockId);
    moveCaretToBlock(
      document.getElementById(prevBlockId),
      "insert",
      update.appendToPrevBlockText,
    );
  },
);

/** readWriteAtom */
export { blocksAtom, curFocusedBlockIdAtom };
/** writeOnlyAtom */
export { insertBlockAtom, removeBlockAtom };
