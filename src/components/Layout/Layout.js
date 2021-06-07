import React, { Fragment, useState } from "react";
import classes from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

const Layout = (props) => {
  const [show, setShow] = useState(false);

  const sideDrawerClosedHandler = () => {
    setShow(false);
  };
  const openSideDrawerHandler = () => {
    //not sure whether this is the way to go. But I need a threshold to tell whether I'm in desktop or mobile
    if (window.innerWidth < 500) {
      setShow(true);
    }
  };
  return (
    <div className={classes.AppContainer}>
      <SideDrawer close={sideDrawerClosedHandler} open={show} />
      <Toolbar openSideDrawer={openSideDrawerHandler} />
      <main className={classes.Content}>{props.children}</main>
    </div>
  );
};

export default Layout;
