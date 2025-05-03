import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function moveCaretToBlock(
  block: HTMLElement | null,
  offset: "start" | "end" | "insert",
  additionalContent?: string | null,
) {
  if (!block) return;
  if (offset === "start") block.focus();
  else {
    const initOffsetDis = block.textContent?.length ?? 0;
    if (additionalContent) {
      block.innerText += additionalContent;
    }
    // 如果block内部的content为空，直接focus即可，但是一定要先把additionalContent添加上
    if (initOffsetDis === 0) {
      block.focus();
      return;
    }
    const textNode = block.childNodes[0];
    const offsetDis =
      offset === "insert" ? initOffsetDis : (textNode.textContent?.length ?? 0);
    const range = document.createRange();
    range.setStart(textNode, offsetDis);
    range.setEnd(textNode, offsetDis);
    const selection = window.getSelection();
    if (!selection) return console.error("Selection not exsits.");
    selection.removeAllRanges();
    selection.addRange(range);
    block.focus();
  }
}

export function getCurrentRange() {
  const selection = window.getSelection();
  if (selection === null || selection.rangeCount === 0) {
    console.error("Cannot get current range, not exists.");
    return null;
  }
  const range = selection.getRangeAt(0);
  return range;
}
