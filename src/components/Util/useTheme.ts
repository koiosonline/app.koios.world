import { useContext, useEffect } from "react";
import { ThemeContext, ThemeContextProps } from "../../Context/ThemeContext";

export enum Themes {
  DARK_THEME = "theme--dark",
  LIGHT_THEME = "theme--light",
}

export const useTheme = () => {
  const { theme, setTheme } = useContext<ThemeContextProps>(ThemeContext);

  const switchTheme = () => {
    if (theme === Themes.LIGHT_THEME) {
      setTheme(Themes.DARK_THEME);
      localStorage.setItem("theme", Themes.DARK_THEME);
    } else {
      setTheme(Themes.LIGHT_THEME);
      localStorage.setItem("theme", Themes.LIGHT_THEME);
    }
  };

  useEffect(() => {
    setTheme(localStorage.getItem("theme") || theme);
  }, [setTheme, theme]);

  return {
    switchTheme,
  };
};