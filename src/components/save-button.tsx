import { Button } from "@/components/ui/button";

import { blockIdsAtom } from "@/lib/atom";
import { blockIdDataMap } from "@/lib/blockStore";
import { ID_LIST_KEY, MAP_ENTRIES_KEY } from "@/lib/constant";

import { useAtomValue } from "jotai";
import { useCallback } from "react";
import { toast } from "sonner";

export const SaveButton = () => {
  const blockIds = useAtomValue(blockIdsAtom);

  const handleSave = useCallback(() => {
    const entries = blockIds.map((id) => {
      const data = blockIdDataMap.get(id)!;
      const initialContent = document.getElementById(id)?.innerText ?? "";
      return [
        id,
        {
          ...data,
          initialContent,
        },
      ];
    });
    try {
      localStorage.setItem(ID_LIST_KEY, JSON.stringify(blockIds));
      localStorage.setItem(MAP_ENTRIES_KEY, JSON.stringify(entries));
      toast.success("Your article has been saved.");
    } catch (error) {
      console.error("Save block data failed", error);
      toast.error("Save article failed.");
    }
  }, [blockIds]);

  return (
    <Button
      className="transition-all"
      variant="outline"
      size="sm"
      onClick={handleSave}
    >
      Save
    </Button>
  );
};
