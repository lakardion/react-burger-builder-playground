import { CLEAR_PRICE, DECREASE_PRICE, INCREASE_PRICE } from "./actionTypes";

export const increasePrice = (value) => ({
  type: INCREASE_PRICE,
  payload: value,
});
export const decreasePrice = (value) => ({
  type: DECREASE_PRICE,
  payload: value,
});

export const clearPrice = () => ({
  type: CLEAR_PRICE,
});
