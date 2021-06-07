import React from "react";
import logo from "./../assets/images/burger-logo.png";
import classes from "./Logo.css";
const Logo = (props) => {
  return (
    <div className={classes.Logo}>
      <img src={logo} alt="logo"></img>
    </div>
  );
};
export default Logo;
