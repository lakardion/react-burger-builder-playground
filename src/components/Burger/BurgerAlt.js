import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIIngredient";
import classes from "./Burger.css";

const BurgerAlt = (props) => {
  let burgerContent = <p>Start adding any ingredients!</p>;
  if (props.ingredients.length > 0) {
    burgerContent = props.ingredients.map((ing, idx) => (
      <BurgerIngredient type={ing.type} key={ing.type + idx} />
    ));
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {burgerContent}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default BurgerAlt;
