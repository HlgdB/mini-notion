import { type FC, memo } from "react";
import { Dot } from "lucide-react";

import { placeholderMap } from "@/lib/constant";

import { BasicBlock, BasicBlockProps } from "./basic";

export type ListBlockUniqueProps = {
  numbered: boolean;
  serialNumber?: number;
};

type ListBlockProps = Omit<BasicBlockProps, "placeholder"> &
  ListBlockUniqueProps;

export const ListBlock: FC<ListBlockProps> = memo(
  ({ numbered, serialNumber, ...props }) => {
    return (
      <BasicBlock
        {...props}
        slot={
          <div className="py-[3px]">
            {!numbered ? (
              <Dot />
            ) : (
              <div className="pr-1.5 pl-2">
                {serialNumber?.toString() + "."}
              </div>
            )}
          </div>
        }
        placeholder={placeholderMap.list}
        className="w-0 grow"
      />
    );
  },
);
