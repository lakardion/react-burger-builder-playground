import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
const App = () => (
  <BrowserRouter>
    <Layout>
      {/* <BurgerBuilderAlt /> */}
      <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/orders" component={Orders} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default App;
