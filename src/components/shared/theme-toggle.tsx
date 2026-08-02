"use client";


import {
  Moon,
  Sun,
} from "lucide-react";


import {
  useSyncExternalStore,
} from "react";


import {
  Button,
} from "@/components/ui/button";


import {
  useTheme,
} from "@/components/providers/theme-provider";





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
    useSyncExternalStore(
      subscribe,
      getSnapshot,
      getServerSnapshot
    );



  const {
    theme,
    toggleTheme,
  } = useTheme();






  if (!mounted) {


    return (

      <Button

        variant="ghost"

        size="icon"

        aria-label="Toggle theme"

      >

        <Moon
          className="h-4 w-4"
        />

      </Button>

    );


  }






  const isDark =
    theme === "dark";






  return (

    <Button

      variant="ghost"

      size="icon"

      onClick={toggleTheme}

      aria-label="Toggle theme"

    >

      {
        isDark ? (

          <Sun
            className="h-4 w-4"
          />

        ) : (

          <Moon
            className="h-4 w-4"
          />

        )
      }

    </Button>

  );

}