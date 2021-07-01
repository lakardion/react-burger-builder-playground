import {
  FETCH_ORDERS,
  FETCH_ORDERS_FAIL,
  FETCH_ORDERS_SUCCESS,
  UPDATE_ORDERS
} from "./actionTypes";

export const updateOrders = (orders) => ({
  type: UPDATE_ORDERS,
  payload: orders,
});

export const fetchOrders = () => ({ type: FETCH_ORDERS });
export const fetchOrdersFail = () => ({ type: FETCH_ORDERS_FAIL });
export const fetchOrdersSuccess = () => ({
  type: FETCH_ORDERS_SUCCESS,
});
