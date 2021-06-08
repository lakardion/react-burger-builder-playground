import React from "react";
import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIIngredient";

const Burger = ({ ingredients }) => {
  let transformedIngredients = Object.keys(ingredients)
    .map((igKey) => {
      return [...Array(ingredients[igKey])].map((_, idx) => (
        <BurgerIngredient key={igKey + idx} type={igKey} />
      ));
    })
    .reduce((prev, current) => {
      return [...prev, ...current];
      //alt: prev.concat(current). Spread gave me some headaches since current is also an array so we have to apply a spread there too.
    }, []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Start adding any ingredients!</p>;
  }
  // useEffect(() => {
  //   props.updater();
  // });
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
