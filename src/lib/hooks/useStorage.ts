import { useEffect } from "react";
import { useSetAtom } from "jotai";

import { blockIdsAtom } from "@/lib/atom";
import { resetMapFromEntries } from "@/lib/blockStore";
import {
  ID_LIST_KEY,
  MAP_ENTRIES_KEY,
  initialIdList,
  initialMapEntries,
} from "@/lib/constant";
import { BlockData } from "@/lib/typing";

export const useInitDataFromStorage = () => {
  const setBlockIds = useSetAtom(blockIdsAtom);

  const reset = () => {
    localStorage.setItem(ID_LIST_KEY, JSON.stringify(initialIdList));
    localStorage.setItem(MAP_ENTRIES_KEY, JSON.stringify(initialMapEntries));
    setBlockIds(initialIdList);
    resetMapFromEntries(initialMapEntries);
  };

  useEffect(() => {
    const idListJSONStr = localStorage.getItem(ID_LIST_KEY);
    const mapEntryJSONStr = localStorage.getItem(MAP_ENTRIES_KEY);
    if (!idListJSONStr || !mapEntryJSONStr) {
      reset();
      return;
    }
    try {
      // TODO: 引入zod.js做强制类型校验
      const idList = JSON.parse(idListJSONStr) as string[];
      const mapEntries = JSON.parse(mapEntryJSONStr) as Readonly<
        [string, BlockData]
      >[];
      setBlockIds(idList);
      resetMapFromEntries(mapEntries);
    } catch (e) {
      console.error("Parse Storage Data Error >>> ", e);
      reset();
    }
  }, []);
};
