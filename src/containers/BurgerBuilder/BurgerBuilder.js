import React, { Fragment, useEffect, useState } from "react";
import axios from "../../axios-orders";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSummaryAsClass from "../../components/Burger/OrderSummary/OrderSummaryAsClass";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import classes from "./BurgerBuilder.css";

let INGREDIENT_PRICES = {};

const BurgerBuilder = ({ history }) => {
  const [ingredients, setIngredients] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [purchasable, setPurchasable] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const purchaseHandler = () => {
    setPurchasing((prevState) => !prevState);
    history.push("/");
  };
  const updatePurchasableState = (ing) => {
    const values = Object.values(ing);
    const sum = values.reduce((sum, val) => sum + val);
    setPurchasable(sum > 0);
  };
  const addIngredientHandler = (type) => {
    const updatedIngredients = { ...ingredients };
    updatedIngredients[type] += 1;
    let updatedPrice = totalPrice;
    updatedPrice += INGREDIENT_PRICES[type];
    setIngredients(updatedIngredients);
    setTotalPrice(updatedPrice);
    updatePurchasableState(updatedIngredients);
  };
  const removeIngredientHandler = (type) => {
    const updatedIngredients = { ...ingredients };
    let updatedPrice = totalPrice;
    if (!updatedIngredients[type]) return;
    updatedIngredients[type] -= 1;
    updatedPrice -= INGREDIENT_PRICES[type];
    setIngredients(updatedIngredients);
    setTotalPrice(updatedPrice);
    updatePurchasableState(updatedIngredients);
  };
  const handleClearIngredients = () => {
    const clearedIngredients = {};
    let currentIngredientsKeys = Object.keys({ ...ingredients });
    currentIngredientsKeys.forEach((key) => {
      clearedIngredients[key] = 0;
    });
    setIngredients(clearedIngredients);
    setTotalPrice(0);
    updatePurchasableState(clearedIngredients);
  };

  const purchaseContinueHandler = () => {
    const queryParams = [];
    for (let i in ingredients) {
      queryParams.push(
        encodeURIComponent(i) + "=" + encodeURIComponent(ingredients[i])
      );
    }
    queryParams.push(
      encodeURIComponent("totalPrice") + "=" + encodeURIComponent(totalPrice)
    );
    const queryString = queryParams.join("&");
    history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const { data } = await axios.get("ingredients");
        setIngredients(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
      try {
        const { data } = await axios.get("prices");
        INGREDIENT_PRICES = data;
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const disabledInfo = { ...ingredients };
  for (const key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] === 0;
  }
  let orderSummary = null;
  if (loading) {
    orderSummary = <Spinner />;
  }
  let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />;
  if (ingredients) {
    burger = (
      <Fragment>
        <Burger
          ingredients={ingredients}
          updater={updatePurchasableState}
        ></Burger>
        <BuildControls
          addHandler={addIngredientHandler}
          removeHandler={removeIngredientHandler}
          disabledInfo={disabledInfo}
          totalPrice={totalPrice}
          purchasable={purchasable}
          purchaseAction={purchaseHandler}
        />
        <div className={classes.flexContainer}>
          <button onClick={handleClearIngredients}>Clear</button>
        </div>
      </Fragment>
    );
    orderSummary = (
      <OrderSummaryAsClass
        ingredients={ingredients}
        removeModal={purchaseHandler}
        continueAction={purchaseContinueHandler}
        price={totalPrice}
        show={purchasing}
      />
    );
  }
  const modal = purchasing ? (
    <Modal show={purchasing} modalClosed={purchaseHandler}>
      {orderSummary}
    </Modal>
  ) : null;

  return (
    <Fragment>
      {modal}
      {burger ? <div className={classes.BurgerFlex}>{burger}</div> : null}
    </Fragment>
  );
};

export default WithErrorHandler(BurgerBuilder, axios);
