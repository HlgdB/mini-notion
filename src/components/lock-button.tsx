import { useAtom } from "jotai";
import { Lock, Unlock } from "lucide-react";

import { lockedAtom } from "@/lib/atom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const LockButton = () => {
  const [locked, setLocked] = useAtom(lockedAtom);

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        setLocked((p) => !p);
      }}
    >
      <Lock
        className={cn(
          "h-[1rem] w-[1rem] scale-100 transition-all",
          !locked && "scale-0",
        )}
      />
      <Unlock
        className={cn(
          "absolute h-[1rem] w-[1rem] scale-0 transition-all",
          !locked && "scale-100",
        )}
      />
      <span className="sr-only">Toggle lock status</span>
    </Button>
  );
};
