import React, { Fragment, useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";
import classes from "./OrderSummary.css";

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igKey, idx) => (
    <li key={igKey + idx}>
      <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
      {props.ingredients[igKey]}
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
          <p className={classes.fontBold}>
            Total is: U$D {props.price.toFixed(2)}
          </p>
        </Col>
      </Row>
      <div className={classes.flexContainer}>
        <Button variant="primary" onClick={props.continueAction}>
          ORDER
        </Button>
        <Button variant="danger" onClick={props.removeModal}>
          CANCEL
        </Button>
      </div>
    </Fragment>
  );
};
export default OrderSummary;
