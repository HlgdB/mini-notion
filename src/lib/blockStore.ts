import { match } from "ts-pattern";
import { type BlockData, BlockTypeEnum } from "@/lib/typing";

export const blockIdDataMap = new Map<string, BlockData>();

export function resetMapFromEntries(entries: Readonly<[string, BlockData]>[]) {
  blockIdDataMap.clear();
  entries.forEach(([key, value]) => blockIdDataMap.set(key, value));
}

export function insertBlock2Map(
  curBlockId: string,
  newBlockId: string,
  content: string,
) {
  const curBlockData = blockIdDataMap.get(curBlockId);
  if (curBlockData === undefined) return;
  match(curBlockData)
    .with({ type: BlockTypeEnum.Text }, { type: BlockTypeEnum.Header }, () => {
      blockIdDataMap.set(newBlockId, {
        type: BlockTypeEnum.Text,
        initialContent: content,
      });
    })
    .with({ type: BlockTypeEnum.List }, (res) => {
      const { numbered } = res.config;
      blockIdDataMap.set(newBlockId, {
        type: BlockTypeEnum.List,
        initialContent: content,
        config: {
          numbered,
        },
      });
    });
}
