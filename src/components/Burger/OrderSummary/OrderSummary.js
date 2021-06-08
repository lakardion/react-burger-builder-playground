import React, { Fragment } from "react";
import { Button, Col, Row } from "react-bootstrap";
import classes from "./OrderSummary.css";

const OrderSummary = ({ ingredients, price, continueAction, removeModal }) => {
  const ingredientSummary = Object.keys(ingredients).map((igKey, idx) => (
    <li key={igKey + idx}>
      <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
      {ingredients[igKey]}
    </li>
  ));
  return (
    <Fragment>
      <Row>
        <Col>
          <h3>Your Order</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>A delicious burger with the following ingredients:</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <ul>{ingredientSummary}</ul>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className={classes.fontBold}>Total is: U$D {price.toFixed(2)}</p>
        </Col>
      </Row>
      <div className={classes.flexContainer}>
        <Button variant="primary" onClick={continueAction}>
          ORDER
        </Button>
        <Button variant="danger" onClick={removeModal}>
          CANCEL
        </Button>
      </div>
    </Fragment>
  );
};
export default OrderSummary;
