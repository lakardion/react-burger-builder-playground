import React from "react";
import classes from "./Order.css";
const Order = (props) => {
  const ingredientList = Object.keys(props.ingredients).map((ingKey, idx) => (
    <li key={`${ingKey}-${idx}`}>
      {ingKey}:{props.ingredients[ingKey]}
    </li>
  ));
  return (
    <div className={classes.Order}>
      <p>Ingredient List:</p>
      <ul>{ingredientList}</ul>
      <p>
        Price: <strong>{props.price}</strong>
      </p>
    </div>
  );
};
export default Order;
