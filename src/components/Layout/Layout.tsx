import React, { useContext } from 'react';
import { SnackbarContext } from '../../Context/SnackbarContext';
import { Snackbar } from '../Snackbar';
import { MainNav } from './MainNav/MainNav';

export const Layout: React.FC = (props) => {
  const snackbarCtx = useContext(SnackbarContext);

  return (
    <>
      <MainNav />
      <main className="main-side-nav">
        {props.children}
        {snackbarCtx.isDisplayed && <Snackbar />}
      </main>
    </>
  );
};