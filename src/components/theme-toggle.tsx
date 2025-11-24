import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/theme-provider";

const ThemeToggle = () => {
  const { toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="relative size-6">
      <span className="relative block w-full h-full">
        <Moon className="absolute inset-0 size-6 rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
        <Sun className="absolute inset-0 size-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </span>
    </button>
  );
};

export { ThemeToggle };
