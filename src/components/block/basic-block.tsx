import type { FC } from "react";
import { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { curFocusedBlockIdAtom } from "@/lib/atom";
import { moveCaretToBlock } from "@/lib/utils";

export const BasicBlock: FC<{ id: string; initialText?: string }> = ({
  id,
  initialText,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [curBlockId, setCurrentBlockId] = useAtom(curFocusedBlockIdAtom);

  useEffect(() => {
    if (!ref.current) return;
    if (initialText) {
      ref.current.innerText = initialText;
    }
    // 如果这个block是新生成的并insert到blocks中的，需要将光标移到这个block的开头
    if (curBlockId === id) moveCaretToBlock(ref.current, "start");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      id={id}
      data-block-id={id}
      ref={ref}
      className="caret-accent-foreground w-full max-w-full border-0 px-[2px] py-[3px] break-words whitespace-pre-wrap outline-0"
      contentEditable
      onFocus={() => {
        setCurrentBlockId(id);
      }}
    />
  );
};
