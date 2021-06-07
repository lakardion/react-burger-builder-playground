import React, { Component } from "react";
import Order from "../../components/Order/Order";
import Axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };
  componentDidMount() {
    this.setState({ loading: true });
    Axios.get("/orders.json")
      .then((res) => {
        const orders = Object.keys(res.data).map((rKey) => {
          return { ...res.data[rKey], id: rKey };
        });
        this.setState({ loading: false, orders: orders });
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }
  render() {
    let orders = this.state.loading && <Spinner />;
    if (!this.state.loading) {
      orders =
        this.state.orders.length > 0 ? (
          this.state.orders.map((o) => {
            return (
              <Order ingredients={o.ingredients} price={o.price} key={o.id} />
            );
          })
        ) : (
          <p>You haven't made any orders yet. Get Started!</p>
        );
    }
    return <div>{orders}</div>;
  }
}
export default WithErrorHandler(Orders, Axios);
