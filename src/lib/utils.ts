import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function moveCaretToBlock(
  block: HTMLElement | null,
  offset: "start" | "end" | "insert",
  content?: string | null,
) {
  if (!block) return;
  if (offset === "start") block.focus();
  else if (offset === "insert") {
    const initOffset = block.textContent?.length ?? 0;
    if (content) {
      block.innerText += content;
    }
    const textNode = block.childNodes[0];
    const range = document.createRange();
    range.setStart(textNode, initOffset);
    range.setEnd(textNode, initOffset);
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
