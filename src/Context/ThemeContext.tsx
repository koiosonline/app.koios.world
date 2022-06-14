import { createContext, useEffect, useState } from "react";

export type ThemeContextProps = {
  theme: string;
  setTheme: (userAccount: string) => void;
};

export const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

export const ThemeContextProvider: React.FC = (props) => {
  const handleInitialState = () => {
    const themeState = localStorage.getItem("theme");
    if (themeState) {
      return themeState;
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'theme--dark';
    } else {
      return 'theme--light';
    }
  };

  const [theme, setTheme] = useState(handleInitialState());

  const handleSystemState = () => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      const newTheme = e.matches ? 'dark' : 'light';
      setTheme(`theme--${newTheme}`);
    });
  };

  useEffect(() => {
    handleSystemState();
  }, []);

  const providerValue = {
    theme,
    setTheme
  };

  return (
    <ThemeContext.Provider value={providerValue}>
      <div className={theme}>
        {props.children}
      </div>
    </ThemeContext.Provider>
  );
};