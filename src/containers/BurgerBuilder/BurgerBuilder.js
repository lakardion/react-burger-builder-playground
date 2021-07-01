import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addIngredient,
  clearIngredients,
  fetchIngredients,
  removeIngredient,
} from "../../store/actions/ingredients/actions";
import {
  clearPrice,
  decreaseTotalPrice,
  fetchPrices,
  increaseTotalPrice,
  updateTotalPrice,
} from "../../store/actions/prices/actions";
import axios from "../../axios-orders";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSummaryAsClass from "../../components/Burger/OrderSummary/OrderSummaryAsClass";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import classes from "./BurgerBuilder.css";
import {
  burgerBuilderStatusSelector,
  ingredientPricesSelector,
  ingredientsSelector,
  priceSelector,
} from "../../store/selectors";

const BurgerBuilder = ({ history }) => {
  const dispatch = useDispatch();
  const ingredients = useSelector(ingredientsSelector);
  const totalPrice = useSelector(priceSelector);
  const { loading, error } = useSelector(burgerBuilderStatusSelector);
  const ingredientPrices = useSelector(ingredientPricesSelector);
  const [purchasable, setPurchasable] = useState(false);
  const [purchasing, setPurchasing] = useState(false);

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
    dispatch(addIngredient(type));
    dispatch(increaseTotalPrice(ingredientPrices[type]));
  };
  const removeIngredientHandler = (type) => {
    dispatch(removeIngredient(type));
    dispatch(decreaseTotalPrice(ingredientPrices[type]));
  };

  const handleClearIngredients = () => {
    dispatch(clearIngredients());
    dispatch(clearPrice());
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
    updatePurchasableState(ingredients);
  }, [ingredients]);

  useEffect(() => {
    const igPricesEntries = Object.entries(ingredientPrices);
    if (!totalPrice && igPricesEntries.length) {
      const totalPrice = igPricesEntries.reduce((sum, [ig, price], idx) => {
        return sum + ingredients[ig] * price;
      }, 0);
      dispatch(updateTotalPrice(totalPrice));
    }
  }, [ingredientPrices]);

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchPrices());
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
