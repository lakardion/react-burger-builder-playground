import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./Toolbar.css";

const Toolbar = ({ openSideDrawer }) => {
  return (
    <header className={classes.Toolbar}>
      <div onClick={openSideDrawer} className={classes.MobileOnly}>
        Menu
      </div>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};
export default Toolbar;
