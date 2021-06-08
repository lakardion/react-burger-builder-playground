import React, { useEffect, useState } from "react";
import { Route } from "react-router";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import classes from "./Checkout.css";
import ContactData from "./ContactData/ContactData";
const Checkout = ({ history, location, match }) => {
  const [ingredients, setIngredients] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const cancelOrder = () => {
    history.push("/");
  };
  const acceptOrder = () => {
    history.replace("checkout/contact-data");
  };
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const addedIngredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === "totalPrice") price = param[1];
      else addedIngredients[param[0]] = +param[1];
    }
    setIngredients(addedIngredients);
    setTotalPrice(price);
  }, []);

  return (
    <div className={classes.CheckoutContainer}>
      <CheckoutSummary
        ingredients={ingredients}
        cancelOrder={cancelOrder}
        acceptOrder={acceptOrder}
      />
      <Route
        path={`${match.path}/contact-data`}
        render={(props) => (
          <ContactData
            ingredients={ingredients}
            price={totalPrice}
            {...props}
          />
        )}
      />
    </div>
  );
};

export default Checkout;
