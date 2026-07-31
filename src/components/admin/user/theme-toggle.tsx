"use client";

import {
  Moon,
  Sun,
} from "lucide-react";

import {
  useSyncExternalStore,
} from "react";

import {
  useTheme,
} from "next-themes";

import {
  Button,
} from "@/components/ui/button";





function useMounted() {

  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
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









export function ThemeToggle() {


  const mounted =
    useMounted();



  const {
    resolvedTheme,
    setTheme,
  } = useTheme();





  if (!mounted) {

    return (

      <Button

        variant="ghost"

        size="icon"

        aria-label="Toggle theme"

      >

        <Moon className="h-4 w-4" />

      </Button>

    );

  }







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

    >

      {
        isDark ? (

          <Sun className="h-4 w-4" />

        ) : (

          <Moon className="h-4 w-4" />

        )
      }

    </Button>

  );

}