import React, { useEffect, useState } from "react";
import Axios from "../../axios-orders";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import classes from "./Orders.css";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const { data } = await Axios.get("orders");
        const orders = Object.keys(data).map((rKey) => {
          return { ...data[rKey], id: rKey };
        });
        setOrders(orders);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
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
