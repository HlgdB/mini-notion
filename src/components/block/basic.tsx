import type { FC } from "react";
import { memo, useEffect, useRef } from "react";
import { useAtom, useAtomValue } from "jotai";
import { curFocusedBlockIdAtom, lockedAtom } from "@/lib/atom";
import { moveCaretToBlock, cn } from "@/lib/utils";
import { usePlaceholder } from "@/lib/hooks/usePlaceholder";

export type BasicBlockProps = {
  id: string;
  placeholder: string;
  className?: string;
  initialContent?: string;
};

export const BasicBlock: FC<BasicBlockProps> = memo(({
  id,
  initialContent,
  className,
  placeholder,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [curBlockId, setCurrentBlockId] = useAtom(curFocusedBlockIdAtom);
  const locked = useAtomValue(lockedAtom);

  useEffect(() => {
    if (!ref.current) return;
    if (initialContent) {
      ref.current.innerText = initialContent;
    }
    // 如果这个block是新生成的并insert到blocks中的，需要将光标移到这个block的开头
    if (curBlockId === id) moveCaretToBlock(ref.current, "start");
  }, [id]);

  usePlaceholder(ref, placeholder);

  return (
    <div
      id={id}
      data-block-id={id}
      ref={ref}
      contentEditable={!locked}
      className={cn(
        "caret-accent-foreground w-full max-w-full border-0 px-[2px] py-[3px] break-words whitespace-pre-wrap outline-0",
        className,
      )}
      onFocus={() => {
        setCurrentBlockId(id);
      }}
    />
  );
});
