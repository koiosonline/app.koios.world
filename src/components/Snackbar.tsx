import { useContext } from "react";
import { SnackbarContext } from "../Context/SnackbarContext";


export const Snackbar = () => {
  const { displayMsg } = useContext(SnackbarContext);
  return <div className="snackbar show">{displayMsg}</div>;
};

