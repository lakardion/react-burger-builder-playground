import React from "react";
import classes from "./Backdrop.css";
const Backdrop = ({show,clicked}) => {
  return show ? (
    <div onClick={clicked} className={classes.Backdrop}></div>
  ) : null;
};
export default Backdrop;
