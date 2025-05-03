import { FC, memo } from "react";
import { placeholderMap } from "@/lib/constant";
import { BasicBlock, BasicBlockProps } from "./basic";

export type TextBlockProps = Omit<BasicBlockProps, "placeholder">;
export const TextBlock: FC<TextBlockProps> = memo((props) => {
  return <BasicBlock {...props} placeholder={placeholderMap.text} />;
});
