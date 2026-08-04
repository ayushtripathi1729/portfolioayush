"use client";

import { useSyncExternalStore } from "react";
import {
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const mounted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
  const {
    resolvedTheme,
    setTheme,
  } = useTheme();

  const isDark =
    resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() =>
        setTheme(
          isDark
            ? "light"
            : "dark"
        )
      }
      aria-label="Toggle theme"
      disabled={!mounted}
    >
      {mounted && isDark ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
}

function subscribe() {
  return () => {};
}

function getSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}
