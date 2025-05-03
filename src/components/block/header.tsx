import { type FC, memo } from "react";

import { placeholderMap } from "@/lib/constant";
import { BasicBlock, BasicBlockProps } from "./basic";

export type HeaderBlockUniqueProps = {
  level: 0 | 1 | 2 | 3;
};

const levelStyleMap = {
  0: "text-[2.5rem]",
  1: "text-3xl",
  2: "text-2xl",
  3: "text-xl",
};

type HeaderBlockProps = Omit<BasicBlockProps, "placeholder"> &
  HeaderBlockUniqueProps;

export const HeaderBlock: FC<HeaderBlockProps> = memo(({ level, ...props }) => {
  return (
    <BasicBlock
      {...props}
      placeholder={placeholderMap.header[level]}
      className={`${levelStyleMap[level]} font-semibold`}
    />
  );
});
