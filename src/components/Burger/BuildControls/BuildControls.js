import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const BuildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Total is U$D <strong>{props.totalPrice.toFixed(2)}</strong>
      </p>
      {controls.map((el, idx) => (
        <BuildControl
          key={el.label + idx}
          label={el.label}
          addHandler={() => props.addHandler(el.type)}
          removeHandler={() => props.removeHandler(el.type)}
          disabledInfo={props.disabledInfo ? props.disabledInfo[el.type] : null}
        />
      ))}
      <button
        onClick={props.purchaseAction}
        className={classes.OrderButton}
        disabled={!props.purchasable}
      >
        ORDER NOW !
      </button>
    </div>
  );
};

export default BuildControls;
