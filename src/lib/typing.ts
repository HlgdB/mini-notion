export enum BlockTypeEnum {
  Text = "text",
  Header = "header",
  List = "list",
  Divider = "divider",
}

export interface Block {
  id: string;
  type: BlockTypeEnum;
  content: string;
}
