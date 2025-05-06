import { useEffect } from "react";
import { useSetAtom } from "jotai";

import { insertBlockAtom } from "@/lib/atom";
import { getCurrentRange } from "@/lib/utils";

export const useHandleEnterEvent = () => {
  const insertBlock = useSetAtom(insertBlockAtom);

  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return;
      e.preventDefault();

      const range = getCurrentRange();
      if (range === null) return;
      const {
        startContainer: { nodeType, textContent },
        startOffset,
      } = range;
      const { TEXT_NODE, ELEMENT_NODE } = Node;
      if (nodeType !== TEXT_NODE && nodeType !== ELEMENT_NODE)
        return console.error("Invalid nodeType.");

      const id = crypto.randomUUID();
      let content = "";
      if (nodeType === TEXT_NODE && textContent !== null) {
        // 先保存光标后的所有内容
        content = textContent.slice(startOffset);
        // 再删除光标后的所有内容
        range.setEnd(range.startContainer, textContent.length);
        range.deleteContents();
      }
      // nodeType是ELEMENT_NODE表示此时block内部的content为空，直接插入新的block即可
      insertBlock({ id, data: content });
    };

    window.addEventListener("keydown", handleEnter);
    return () => {
      window.removeEventListener("keydown", handleEnter);
    };
  }, [insertBlock]);
};
