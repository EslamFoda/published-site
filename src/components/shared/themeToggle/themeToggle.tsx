"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div
      className="flex items-center h-full relative justify-center group cursor-pointer select-none"
      onClick={toggleTheme}
    >
      {theme === "light" ? (
        <Moon
          className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          size={20}
        />
      ) : (
        <Sun
          className="rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          size={20}
        />
      )}
    </div>
  );
}
