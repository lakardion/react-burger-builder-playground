import {
  CLEAR_PRICE,
  DECREASE_PRICE,
  INCREASE_PRICE,
  UPDATE_TOTAL_PRICE,
} from "../actions/prices/actionTypes";

const initialState = 0;

export default (state = initialState, action) => {
  switch (action.type) {
    case INCREASE_PRICE:
      return state + action.payload;
    case DECREASE_PRICE:
      return state > 0 ? state - action.payload : 0;
    case CLEAR_PRICE:
      return initialState;
    case UPDATE_TOTAL_PRICE:
      return action.payload;
    default:
      return state;
  }
};
