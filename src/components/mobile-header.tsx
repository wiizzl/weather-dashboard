import { Menu } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

import { ThemeToggle } from "@/components/theme-toggle";

type MobileHeaderProps = {
  setSidePanelOpen: Dispatch<SetStateAction<boolean>>;
};

const MobileHeader = (props: MobileHeaderProps) => {
  return (
    <header className="w-full h-16 p-4 bg-background sticky top-0 xs:hidden flex justify-between z-1001">
      <ThemeToggle />
      <button onClick={() => props.setSidePanelOpen(true)}>
        <Menu className="size-6" />
      </button>
    </header>
  );
};

export { MobileHeader };
