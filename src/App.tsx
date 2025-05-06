import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/theme-mode-toggle";
import { SaveButton } from "@/components/save-button";
import { LockButton } from "@/components/lock-button";
import { BlockListAdapter } from "@/components/block-list-adapter";
import { Toaster } from "@/components/ui/sonner";
import {
  NewBlockMenuRoot,
  NewBlockMenuTrigger,
  NewBlockMenuContent,
} from "@/components/new-block-menu";

import { useInitDataFromStorage } from "./lib/hooks/useStorage";
import { useHandleEnterEvent } from "@/lib/hooks/useHandleEnterEvent";
import { useHandleDeleteEvent } from "@/lib/hooks/useHandleDeleteEvent";

import "./App.css";

function App() {
  useInitDataFromStorage();
  useHandleEnterEvent();
  useHandleDeleteEvent();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <header>
        <div className="font-bold italic">Mini Notion</div>
        <div className="flex h-full items-center gap-2">
          <SaveButton />
          <LockButton />
          <ModeToggle />
        </div>
      </header>
      <main>
        <div className="content">
          <NewBlockMenuRoot modal={false}>
            <NewBlockMenuTrigger>
              <BlockListAdapter />
            </NewBlockMenuTrigger>
            <NewBlockMenuContent />
          </NewBlockMenuRoot>
        </div>
      </main>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
