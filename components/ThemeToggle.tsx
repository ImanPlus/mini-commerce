"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <span className="dark:hidden">Dark</span>
      <span className="hidden dark:inline">Light</span>
    </Button>
  );
}
