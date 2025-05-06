import { match } from "ts-pattern";
import { type BlockData, BlockTypeEnum } from "@/lib/typing";

export const blockIdDataMap = new Map<string, BlockData>();

export function resetMapFromEntries(entries: Readonly<[string, BlockData]>[]) {
  blockIdDataMap.clear();
  entries.forEach(([key, value]) => blockIdDataMap.set(key, value));
}

export function insertBlock2Map(
  curBlockId: string,
  newBlock: {
    id: string;
    data?: string | BlockData;
  },
) {
  const { id: newBlockId, data = "" } = newBlock;
  const curBlockData = blockIdDataMap.get(curBlockId);
  if (curBlockData === undefined) return;
  if (typeof data !== "string") {
    blockIdDataMap.set(newBlockId, {
      ...data,
      initialContent: document.getElementById(curBlockId)?.textContent ?? "",
    });
    return;
  }
  match(curBlockData)
    .with({ type: BlockTypeEnum.Text }, { type: BlockTypeEnum.Header }, () => {
      blockIdDataMap.set(newBlockId, {
        type: BlockTypeEnum.Text,
        initialContent: data,
      });
    })
    .with({ type: BlockTypeEnum.List }, (res) => {
      const { numbered } = res.config;
      blockIdDataMap.set(newBlockId, {
        type: BlockTypeEnum.List,
        initialContent: data,
        config: {
          numbered,
        },
      });
    });
}
