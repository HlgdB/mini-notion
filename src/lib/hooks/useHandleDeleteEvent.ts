import { useEffect } from "react";
import { useSetAtom } from "jotai";

import { removeBlockAtom } from "@/lib/atom";
import { getCurrentRange } from "@/lib/utils";

export const useHandleDeleteEvent = () => {
  const removeBlock = useSetAtom(removeBlockAtom);

  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key !== "Backspace") return;
      const range = getCurrentRange();
      if (range === null) return;
      const {
        startContainer: { textContent },
        startOffset,
        endOffset,
      } = range;
      if (startOffset === 0 && endOffset === 0) {
        // 说明是光标在当前block的开头，移除当前block
        e.preventDefault();
        removeBlock({ appendToPrevBlockText: textContent });
      }
    };

    window.addEventListener("keydown", handleEnter);
    return () => {
      window.removeEventListener("keydown", handleEnter);
    };
  }, [removeBlock]);
};
