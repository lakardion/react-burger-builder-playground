import React, { Component, Fragment } from "react";
import axios from "../../axios-orders";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSummaryAsClass from "../../components/Burger/OrderSummary/OrderSummaryAsClass";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
// import { Row, Col } from "react-bootstrap";
import classes from "./BurgerBuilder.css";

let INGREDIENT_PRICES = {};

class BurgerBuilder extends Component {
  state = {
    ingredients: {},
    totalPrice: 0,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  purchaseHandler = () => {
    this.setState((prevState) => ({ purchasing: !prevState.purchasing }));
    this.props.history.push("/");
  };
  updatePurchasableState = (ing) => {
    const values = Object.values(ing);
    const sum = values.reduce((sum, val) => sum + val);
    this.setState({ purchasable: sum > 0 });
  };
  addIngredientHandler = (type) => {
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] += 1;
    let updatedPrice = this.state.totalPrice;
    updatedPrice += INGREDIENT_PRICES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice,
    });
    this.updatePurchasableState(updatedIngredients);
  };
  removeIngredientHandler = (type) => {
    const updatedIngredients = { ...this.state.ingredients };
    let updatedPrice = this.state.totalPrice;
    if (!updatedIngredients[type]) return;
    updatedIngredients[type] -= 1;
    updatedPrice -= INGREDIENT_PRICES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice,
    });
    this.updatePurchasableState(updatedIngredients);
  };
  handleClearIngredients = () => {
    const clearedIngredients = {};
    let currentIngredientsKeys = Object.keys({ ...this.state.ingredients });
    currentIngredientsKeys.forEach((key) => {
      clearedIngredients[key] = 0;
    });
    this.setState({
      ingredients: clearedIngredients,
      totalPrice: 0,
    });
    this.updatePurchasableState(clearedIngredients);
  };

  purchaseContinueHandler = () => {
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push(
      encodeURIComponent("totalPrice") +
        "=" +
        encodeURIComponent(this.state.totalPrice)
    );
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  componentDidMount() {
    axios
      .get("/ingredients")
      .then((resp) => {
        this.setState({ ingredients: resp.data });
      })
      .catch((err) => {
        this.setState({ error: true });
      });
    axios
      .get("/prices")
      .then((resp) => {
        INGREDIENT_PRICES = resp.data;
      })
      .catch((err) => {
        this.setState({ error: true });
      });
  }
  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0;
    }
    let orderSummary = null;
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    let burger = this.state.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );
    if (this.state.ingredients) {
      burger = (
        <Fragment>
          <Burger
            ingredients={this.state.ingredients}
            updater={this.updatePurchasableState}
          ></Burger>
          <BuildControls
            addHandler={this.addIngredientHandler}
            removeHandler={this.removeIngredientHandler}
            disabledInfo={disabledInfo}
            totalPrice={this.state.totalPrice}
            purchasable={this.state.purchasable}
            purchaseAction={this.purchaseHandler}
          />
          <div className={classes.flexContainer}>
            <button onClick={this.handleClearIngredients}>Clear</button>
          </div>
        </Fragment>
      );
      orderSummary = (
        <OrderSummaryAsClass
          ingredients={this.state.ingredients}
          removeModal={this.purchaseHandler}
          continueAction={this.purchaseContinueHandler}
          price={this.state.totalPrice}
          show={this.state.purchasing}
        />
      );
    }
    const modal = this.state.purchasing ? (
      <Modal show={this.state.purchasing} modalClosed={this.purchaseHandler}>
        {orderSummary}
      </Modal>
    ) : null;

    return (
      <Fragment>
        {modal}
        {burger ? <div className={classes.BurgerFlex}>{burger}</div> : null}
      </Fragment>
    );
  }
}

export default WithErrorHandler(BurgerBuilder, axios);
