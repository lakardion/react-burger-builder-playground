import React, { Fragment, Component, useEffect } from "react";
import classes from "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";
const Modal = ({ show, modalClosed, children }) => (
  <Fragment>
    <Backdrop clicked={modalClosed} show={show} />
    <div
      className={classes.Modal}
      style={{
        transform: show ? "translateY(0)" : "translateY(-100vh)",
        opacity: show ? "1" : "0",
      }}
    >
      {children}
    </div>
  </Fragment>
);

export default Modal;
