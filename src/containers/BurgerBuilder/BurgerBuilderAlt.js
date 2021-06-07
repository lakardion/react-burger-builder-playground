import React, { useState, Fragment, useEffect } from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import classes from "./BurgerBuilder.css";
import BurgerAlt from "../../components/Burger/BurgerAlt";

const INGREDIENT_PRICES = {
  salad: 0.3,
  bacon: 0.8,
  cheese: 0.6,
  meat: 1.5,
};

const BurgerBuilderAlt = (props) => {
  const [ingredients, setIngredients] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const addIngredientHandler = (type) => {
    const currentIngredients = [...ingredients];
    currentIngredients.push({ type: type });
    setIngredients(currentIngredients);
    setTotalPrice((prevState) => prevState + INGREDIENT_PRICES[type]);
  };

  const removeIngredientHandler = (type) => {
    const currentIngredients = [...ingredients];
    currentIngredients.reverse();
    const removeIndex = currentIngredients.findIndex((x) => x.type === type);
    if (removeIndex !== -1) {
      currentIngredients.splice(removeIndex, 1);
      currentIngredients.reverse();
      setIngredients(currentIngredients);
      setTotalPrice((prevState) => prevState - INGREDIENT_PRICES[type]);
    }
  };

  const handleClearIngredients = () => {
    setIngredients([]);
    setTotalPrice(0);
  };
  return (
    <Fragment>
      {/* <Burger ingredients={ingredients}></Burger> */}
      <BurgerAlt ingredients={ingredients}></BurgerAlt>
      <BuildControls
        addHandler={addIngredientHandler}
        removeHandler={removeIngredientHandler}
        // disabledInfo={disabledInfo}
        totalPrice={totalPrice}
      />
      <div className={classes.flexContainer}>
        <button onClick={handleClearIngredients}>Clear</button>
      </div>
    </Fragment>
  );
};

export default BurgerBuilderAlt;
