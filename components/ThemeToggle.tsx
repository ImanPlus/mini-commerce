"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Moon className="h-4 w-4 dark:hidden" />
      <span className="dark:hidden">Dark</span>

      <Sun className="h-4 w-4 hidden dark:inline" />
      <span className="hidden dark:inline">Light</span>
    </Button>
  );
}
