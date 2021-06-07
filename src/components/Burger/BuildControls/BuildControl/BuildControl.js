import React from "react";
import classes from "./BuildControl.css";

const BuildControl = (props) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button
      className={classes.Less}
      onClick={props.removeHandler}
      disabled={props.disabledInfo ? props.disabledInfo : false}
    >
      Less
    </button>
    <button className={classes.More} onClick={props.addHandler}>
      More
    </button>
  </div>
);
export default BuildControl;

{
  /* <Container>
      <Row>
        <Col md="4"></Col>
        <Col md="2">
          <div>{props.label}</div>
        </Col>
        <Col md="1">
          <button onClick={props.removeHandler} disabled={props.disabledInfo}>
            Less
          </button>
        </Col>
        <Col md="1">
          <button onClick={props.addHandler}>More</button>
        </Col>
        <Col md="4"></Col>
      </Row>
    </Container> */
}
