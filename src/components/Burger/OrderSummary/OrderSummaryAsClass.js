import React, { Fragment, useEffect, Component } from "react";
import { Button, Row, Col } from "react-bootstrap";
import classes from "./OrderSummary.css";

class OrderSummaryAsClass extends Component {
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (igKey, idx) => (
        <li key={igKey + idx}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
          {this.props.ingredients[igKey]}
        </li>
      )
    );
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
              Total is: U$D {this.props.price.toFixed(2)}
            </p>
          </Col>
        </Row>
        <div className={classes.flexContainer}>
          <Button variant="primary" onClick={this.props.continueAction}>
            ORDER
          </Button>
          <Button variant="danger" onClick={this.props.removeModal}>
            CANCEL
          </Button>
        </div>
      </Fragment>
    );
  }
}
export default OrderSummaryAsClass;
