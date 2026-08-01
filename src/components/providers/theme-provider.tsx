"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";


type Theme =
  | "light"
  | "dark";


interface ThemeContextType {

  theme: Theme;

  toggleTheme: () => void;

}





const ThemeContext =
  createContext<ThemeContextType | undefined>(
    undefined
  );








function getInitialTheme(): Theme {


  if (
    typeof window === "undefined"
  ) {

    return "light";

  }





  const storedTheme =
    localStorage.getItem(
      "portfolio-theme"
    ) as Theme | null;





  if (storedTheme) {

    return storedTheme;

  }





  const systemDark =
    window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;





  return systemDark
    ? "dark"
    : "light";

}









export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {



  const [theme, setTheme] =
    useState<Theme>(
      getInitialTheme
    );







  useEffect(() => {


    const root =
      document.documentElement;



    root.classList.remove(
      "light",
      "dark"
    );



    root.classList.add(
      theme
    );



    localStorage.setItem(
      "portfolio-theme",
      theme
    );


  }, [theme]);









  function toggleTheme() {


    setTheme(
      current =>
        current === "dark"
          ? "light"
          : "dark"
    );


  }









  return (

    <ThemeContext.Provider

      value={{
        theme,
        toggleTheme,
      }}

    >

      {children}

    </ThemeContext.Provider>

  );

}









export function useTheme() {


  const context =
    useContext(
      ThemeContext
    );



  if (!context) {

    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );

  }



  return context;

}