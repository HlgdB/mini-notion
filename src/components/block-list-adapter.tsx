import { FC, useEffect, useMemo } from "react";
import { useAtomValue, useAtom } from "jotai";
import { match } from "ts-pattern";

import { blockIdsAtom, changedAtom } from "@/lib/atom";
import { BlockTypeEnum } from "@/lib/typing";
import { blockIdDataMap } from "@/lib/blockStore";

import { TextBlock } from "./block/text";
import { HeaderBlock } from "./block/header";
import { ListBlock } from "./block/list";

export const BlockListAdapter: FC = () => {
  const blockIds = useAtomValue(blockIdsAtom);
  const [changed, setChanged] = useAtom(changedAtom);

  useEffect(() => {
    setChanged(true);
  }, [blockIds]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (changed) {
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [changed]);

  // 按照 blockIds 的顺序遍历一遍当前数据，更新所有numbered-list-block的序号
  const numberedBlockIdSnMap = useMemo(() => {
    const res: Record<string, number> = {};
    let sn = 0;
    for (const id of blockIds) {
      const data = blockIdDataMap.get(id);
      if (data?.type === BlockTypeEnum.List && data.config.numbered) {
        sn += 1;
        res[id] = sn;
      } else {
        sn = 0;
      }
    }
    return res;
  }, [blockIds]);

  return blockIds.map((id) => {
    const blockData = blockIdDataMap.get(id);
    if (!blockData) {
      console.error("Invalid Block Id", id);
      return null;
    }
    return match(blockData)
      .with({ type: BlockTypeEnum.Text }, (block) => (
        <TextBlock key={id} id={id} initialContent={block.initialContent} />
      ))
      .with({ type: BlockTypeEnum.Header }, (block) => (
        <HeaderBlock
          key={id}
          id={id}
          initialContent={block.initialContent}
          level={block.config.level}
        />
      ))
      .with({ type: BlockTypeEnum.List }, (block) => {
        return (
          <ListBlock
            key={id}
            id={id}
            initialContent={block.initialContent}
            numbered={block.config.numbered}
            serialNumber={numberedBlockIdSnMap[id]}
          />
        );
      })
      .exhaustive();
  });
};
