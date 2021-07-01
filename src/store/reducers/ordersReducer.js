import { UPDATE_ORDERS } from "../actions/orders/actionTypes";

export default (state = [], action) => {
  switch (action.type) {
    case UPDATE_ORDERS:
      const orders = Object.keys(action.payload).map((rKey) => {
        return { ...action.payload[rKey], id: rKey };
      });
      return orders;
    default:
      return state;
  }
};
