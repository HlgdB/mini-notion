import type { FC, ReactNode } from "react";
import { memo, useEffect, useRef } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { GripVertical } from "lucide-react";
import { debounce } from "lodash";
import {
  curFocusedBlockIdAtom,
  lockedAtom,
  setChangedTrueAtom,
} from "@/lib/atom";
import { moveCaretToBlock, cn } from "@/lib/utils";
import { usePlaceholder } from "@/lib/hooks/usePlaceholder";
import { useDraggable } from "@/lib/hooks/useDraggable";
import { Button } from "../ui/button";

export type BasicBlockProps = {
  id: string;
  placeholder: string;
  className?: string;
  initialContent?: string;
  slot?: ReactNode;
};

export const BasicBlock: FC<BasicBlockProps> = memo(
  ({ id, initialContent, className, placeholder, slot }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [curBlockId, setCurrentBlockId] = useAtom(curFocusedBlockIdAtom);
    const locked = useAtomValue(lockedAtom);
    const setChangedTrue = useSetAtom(setChangedTrueAtom);

    useEffect(() => {
      if (!ref.current) return;
      if (initialContent) {
        ref.current.innerText = initialContent;
      }
      // 如果这个block是新生成的并insert到blocks中的，需要将光标移到这个block的开头
      if (curBlockId === id) moveCaretToBlock(ref.current, "start");
    }, [id]);

    usePlaceholder(ref, placeholder);
    const {
      draggable,
      showDragBtn,
      handleDragStart,
      handleDragOver,
      handleDragLeave,
      handleDrop,
      handleDragEnd,
      setShowDragBtn,
    } = useDraggable(id);

    return (
      <div
        className="relative flex py-px"
        data-block-id={id}
        draggable={draggable && !locked}
        onDragStart={() => handleDragStart(id)}
        onDragOver={(e) => handleDragOver(e, id)}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, id)}
        onDragEnd={handleDragEnd}
      >
        {slot}
        <div
          id={id}
          ref={ref}
          contentEditable={!locked}
          className={cn(
            "caret-accent-foreground w-full max-w-full border-0 px-[2px] py-[3px] break-words whitespace-pre-wrap outline-0",
            className,
          )}
          onFocus={() => {
            setCurrentBlockId(id);
          }}
          onInput={debounce(() => {
            setChangedTrue();
          }, 100)}
        />
        <div
          className="absolute top-0 -left-14 grid h-full place-items-center pr-4 pl-8"
          onMouseEnter={() => setShowDragBtn(true)}
          onMouseLeave={() => setShowDragBtn(false)}
        >
          <Button variant="ghost" size="xs" hidden={!showDragBtn || locked}>
            <GripVertical />
          </Button>
        </div>
      </div>
    );
  },
);
