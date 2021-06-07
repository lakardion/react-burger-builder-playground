import React from "react";
import classes from "./Input.css";
const Input = (props) => {
  let inputElement = null;
  let inputClasses = [classes.InputElement];
  if (props.invalid) {
    inputClasses.push(classes.Invalid);
  }
  switch (props.inputtype) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select className={inputClasses.join(" ")} onChange={props.changed}>
          {props.elementConfig.options.map((op) => (
            <option key={op.value} value={op.value}>
              {op.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};
export default Input;
