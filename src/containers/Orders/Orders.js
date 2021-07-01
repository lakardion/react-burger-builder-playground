import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../../axios-orders";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { fetchOrders } from "../../store/actions/orders/actions";
import burgerBuilderStatusSelector from "../../store/selectors/burgerBuilderStatusSelector";
import ordersSelector from "../../store/selectors/ordersSelector";
import classes from "./Orders.css";
const Orders = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(burgerBuilderStatusSelector);
  const orders = useSelector(ordersSelector);

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  return (
    <div className={classes.OrdersContainer}>
      {loading ? (
        <Spinner />
      ) : orders.length ? (
        orders.map((o) => (
          <Order ingredients={o.ingredients} price={o.price} key={o.id} />
        ))
      ) : (
        <p>You haven't made any orders yet. Get Started!</p>
      )}
    </div>
  );
};
export default WithErrorHandler(Orders, Axios);
