import { useState, useCallback } from "react";
import { atom, useAtom } from "jotai";

import { blockIdsAtom } from "@/lib/atom";
import { blockIdDataMap } from "@/lib/blockStore";

const draggedIdAtom = atom<string | null>(null);

export const useDraggable = (id: string) => {
  const [showDragBtn, setShowDragBtn] = useState(false);
  const [draggedId, setDraggedId] = useAtom(draggedIdAtom);
  const [blocks, setBlocks] = useAtom(blockIdsAtom);

  const handleDragStart = useCallback(
    (id: string) => {
      setShowDragBtn(false);
      setDraggedId(id);
      // FIXME: 每次开始拖拽之前需要保存一次所有block的文本内容，文章过长时会有性能问题，应该优化
      blocks.forEach((id) => {
        const data = blockIdDataMap.get(id)!;
        const initialContent = document.getElementById(id)?.textContent ?? "";
        blockIdDataMap.set(id, {
          ...data,
          initialContent,
        });
      });
    },
    [id],
  );

  const handleDragOver = useCallback((e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (targetId === draggedId) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const isInsertAbove = e.clientY < rect.top + rect.height / 2;
    e.currentTarget.setAttribute(
      "data-insert-position",
      isInsertAbove ? "above" : "below",
    );
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.removeAttribute("data-insert-position");
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, targetId: string) => {
      e.preventDefault();
      if (!draggedId || !targetId) return;
      if (targetId === blocks[0]) return;
      if (draggedId === targetId) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const isInsertAbove = e.clientY < rect.top + rect.height / 2;

      const draggedIndex = blocks.findIndex((id) => id === draggedId);
      if (draggedIndex !== -1) {
        const newBlocks = [...blocks];
        const [removed] = newBlocks.splice(draggedIndex, 1);
        // 必须先将dragged的block从原位置移除，否则会导致targetIndex的位置不对
        const targetIndex = newBlocks.findIndex((id) => id === targetId);
        if (targetIndex !== -1) {
          newBlocks.splice(
            isInsertAbove ? targetIndex : targetIndex + 1,
            0,
            removed,
          );
          setBlocks(newBlocks);
        }
      }

      setDraggedId(null);
    },
    [blocks, draggedId],
  );

  const handleDragEnd = useCallback(() => {
    const elments = document.querySelectorAll("[data-insert-position]");
    elments.forEach((el) => {
      el.removeAttribute("data-insert-position");
    });
  }, []);

  return {
    draggable: id !== blocks[0] && showDragBtn,
    showDragBtn: showDragBtn,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
    setShowDragBtn,
  };
};
