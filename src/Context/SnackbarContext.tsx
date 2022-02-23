import { createContext, useEffect, useState } from 'react';
import { SnackbarContextData } from '../types/Context/Snackbar';

export const SnackbarContext = createContext<SnackbarContextData>({} as SnackbarContextData);

export const SnackbarContextProvider: React.FC = (props) => {
  const [displayMsg, setDisplayMsg] = useState<string>('');
  const [isDisplayed, setIsDisplayed] = useState<boolean>(false);

  useEffect(() => {
    setIsDisplayed(Boolean(displayMsg));
  }, [displayMsg]);

  const providerValue: SnackbarContextData = {
    isDisplayed,
    displayMsg,
    setDisplayMsg,
  };

  return <SnackbarContext.Provider value={providerValue}>{props.children}</SnackbarContext.Provider>;
};
