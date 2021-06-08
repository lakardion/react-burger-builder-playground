import React from "react";
import classes from "./Order.css";
const Order = ({ingredients,price}) => {
  const ingredientList = Object.keys(ingredients).map((ingKey, idx) => (
    <li key={`${ingKey}-${idx}`}>
      {ingKey}:{ingredients[ingKey]}
    </li>
  ));
  return (
    <div className={classes.Order}>
      <p>Ingredient List:</p>
      <ul>{ingredientList}</ul>
      <p>
        Price: <strong>U$D {parseFloat(price).toFixed(2)}</strong>
      </p>
    </div>
  );
};
export default Order;
