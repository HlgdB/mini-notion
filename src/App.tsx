import { useAtomValue } from "jotai";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/theme-mode-toggle";
import { BasicBlock } from "@/components/block/basic-block";

import { blocksAtom } from "@/lib/atom";
import { useHandleEnterEvent } from "@/lib/hooks/useHandleEnterEvent";
import { useHandleDeleteEvent } from "./lib/hooks/useHandleDeleteEvent";

import "./App.css";

function App() {
  const blocks = useAtomValue(blocksAtom);

  useHandleEnterEvent();
  useHandleDeleteEvent();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <header>
        <div>Hello, World</div>
        <ModeToggle />
      </header>
      <main>
        <div className="content">
          {blocks.map((item) => (
            <BasicBlock key={item.id} id={item.id} initialText={item.content} />
          ))}
        </div>
      </main>
    </ThemeProvider>
  );
}

export default App;
