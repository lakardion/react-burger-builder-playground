import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.css";
const NavigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      {/* {props.items.map((el, idx) => {
        <NavigationItem />;
      })} */}
      <NavigationItem link="/">Burger Builder</NavigationItem>
      <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
  );
};
export default NavigationItems;
