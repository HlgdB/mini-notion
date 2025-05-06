import { BlockData, BlockTypeEnum } from "./typing";

export const placeholderMap = {
  [BlockTypeEnum.Text]:
    "Right-click to change the block type, or Enter to add a new block",
  [BlockTypeEnum.Header]: {
    0: "Article Title",
    1: "Header 1",
    2: "Header 2",
    3: "Header 3",
  },
  [BlockTypeEnum.List]: "List",
};

export const ID_LIST_KEY = "BLOCK-ID-LIST";
export const MAP_ENTRIES_KEY = "BLOCK-ID-DATA-MAP-ENTRIES";
export const initialIdList = new Array(11).map(() => crypto.randomUUID());
export const initialMapEntries: Readonly<[string, BlockData]>[] = [
  [
    initialIdList[0],
    {
      type: BlockTypeEnum.Header,
      initialContent: "Article Title",
      config: {
        level: 0,
      },
    },
  ],
  [
    initialIdList[1],
    {
      type: BlockTypeEnum.Header,
      initialContent: "This is a header 1 block",
      config: {
        level: 1,
      },
    },
  ],
  [
    initialIdList[2],
    {
      type: BlockTypeEnum.Header,
      initialContent: "This is a header 2 block",
      config: {
        level: 2,
      },
    },
  ],
  [
    initialIdList[3],
    {
      type: BlockTypeEnum.Header,
      initialContent: "This is a header 3 block",
      config: {
        level: 3,
      },
    },
  ],

  [
    initialIdList[4],
    {
      type: BlockTypeEnum.List,
      config: {
        numbered: true,
      },
      initialContent: "Numbered list item 1",
    },
  ],
  [
    initialIdList[5],
    {
      type: BlockTypeEnum.List,
      config: {
        numbered: true,
      },
      initialContent: "Numbered list item 2",
    },
  ],
  [
    initialIdList[6],
    {
      type: BlockTypeEnum.List,
      config: {
        numbered: true,
      },
      initialContent: "Numbered list item 3",
    },
  ],

  [
    initialIdList[7],
    {
      type: BlockTypeEnum.List,
      config: {
        numbered: false,
      },
      initialContent: "Bulleted list item",
    },
  ],
  [
    initialIdList[8],
    {
      type: BlockTypeEnum.List,
      config: {
        numbered: false,
      },
      initialContent: "Bulleted list item",
    },
  ],
  [
    initialIdList[9],
    {
      type: BlockTypeEnum.List,
      config: {
        numbered: false,
      },
      initialContent: "Bulleted list item",
    },
  ],

  [
    initialIdList[10],
    {
      type: BlockTypeEnum.Text,
      initialContent: "This is a text block",
    },
  ],
];
