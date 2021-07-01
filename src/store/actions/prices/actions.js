import {
  CLEAR_PRICE,
  DECREASE_PRICE,
  FETCH_PRICES,
  INCREASE_PRICE,
  UPDATE_PRICES,
  UPDATE_TOTAL_PRICE,
} from "./actionTypes";

//ingredients prices
export const fetchPrices = () => ({
  type: FETCH_PRICES,
});
export const updatePrices = (prices) => ({
  type: UPDATE_PRICES,
  payload: prices,
});

//totalPrice
export const increaseTotalPrice = (value) => ({
  type: INCREASE_PRICE,
  payload: value,
});
export const decreaseTotalPrice = (value) => ({
  type: DECREASE_PRICE,
  payload: value,
});
export const updateTotalPrice = (value) => ({
  type: UPDATE_TOTAL_PRICE,
  payload: value,
});

export const clearPrice = () => ({
  type: CLEAR_PRICE,
});
