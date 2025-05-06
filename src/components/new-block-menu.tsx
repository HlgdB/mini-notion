import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { insertBlockAtom } from "@/lib/atom";
import { useSetAtom } from "jotai";
import { BlockTypeEnum } from "@/lib/typing";

export const NewBlockMenuRoot = ContextMenu;
export const NewBlockMenuTrigger = ContextMenuTrigger;
export const NewBlockMenuContent = () => {
  const insertBlock = useSetAtom(insertBlockAtom);

  return (
    <ContextMenuContent className="w-44">
      <ContextMenuItem
        onClick={() => {
          insertBlock({
            id: crypto.randomUUID(),
            data: {
              type: BlockTypeEnum.Text,
              initialContent: "",
            },
          });
        }}
      >
        Text
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem
        onClick={() => {
          insertBlock({
            id: crypto.randomUUID(),
            data: {
              type: BlockTypeEnum.Header,
              initialContent: "",
              config: {
                level: 1,
              },
            },
          });
        }}
      >
        Heading 1
      </ContextMenuItem>
      <ContextMenuItem
        onClick={() => {
          insertBlock({
            id: crypto.randomUUID(),
            data: {
              type: BlockTypeEnum.Header,
              initialContent: "",
              config: {
                level: 2,
              },
            },
          });
        }}
      >
        Heading 2
      </ContextMenuItem>
      <ContextMenuItem
        onClick={() => {
          insertBlock({
            id: crypto.randomUUID(),
            data: {
              type: BlockTypeEnum.Header,
              initialContent: "",
              config: {
                level: 3,
              },
            },
          });
        }}
      >
        Heading 3
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem
        onClick={() => {
          insertBlock({
            id: crypto.randomUUID(),
            data: {
              type: BlockTypeEnum.List,
              initialContent: "",
              config: {
                numbered: false,
              },
            },
          });
        }}
      >
        Bulleted list
      </ContextMenuItem>
      <ContextMenuItem
        onClick={() => {
          insertBlock({
            id: crypto.randomUUID(),
            data: {
              type: BlockTypeEnum.List,
              initialContent: "",
              config: {
                numbered: true,
              },
            },
          });
        }}
      >
        Numbered list
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem>
        Back to edit
        <ContextMenuShortcut>esc</ContextMenuShortcut>
      </ContextMenuItem>
    </ContextMenuContent>
  );
};
