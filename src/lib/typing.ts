import type { HeaderBlockUniqueProps } from "@/components/block/header";
import type { ListBlockUniqueProps } from "@/components/block/list";

export type BlockType = "text" | "header" | "list";

export enum BlockTypeEnum {
  Text = "text",
  Header = "header",
  List = "list",
  /** TODO: */
  // Divider = "divider",
  // Quote = "quote",
  // Code = "code",
  // Todo = "todo",
}

export type BlockData =
  | { type: BlockTypeEnum.Text; initialContent: string }
  | {
      type: BlockTypeEnum.Header;
      initialContent: string;
      config: HeaderBlockUniqueProps;
    }
  | {
      type: BlockTypeEnum.List;
      initialContent: string;
      config: ListBlockUniqueProps;
    };

export type BlockContentMap = Record<string, string>;
