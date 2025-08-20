"use client";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" && (
        <Sun
          className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 dark:scale-0 dark:rotate-90 transition-all"
          color="black"
        />
      )}
      {theme === "dark" && (
        <Moon
          className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all"
          color="white"
        />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
