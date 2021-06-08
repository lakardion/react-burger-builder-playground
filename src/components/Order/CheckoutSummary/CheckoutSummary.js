import React from "react";
import Burger from "../../Burger/Burger";
import classes from "./CheckoutSummary.css";
import { Button } from "react-bootstrap";
const CheckoutSummary = ({ ingredients, acceptOrder, cancelOrder }) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <Burger ingredients={ingredients} />
      <div className={classes.flexContainer}>
        <Button variant="primary" onClick={acceptOrder}>
          ORDER
        </Button>
        <Button variant="danger" onClick={cancelOrder}>
          CANCEL
        </Button>
      </div>
    </div>
  );
};
export default CheckoutSummary;
