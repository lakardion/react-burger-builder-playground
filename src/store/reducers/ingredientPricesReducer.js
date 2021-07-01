import { UPDATE_PRICES } from "../actions/prices/actionTypes";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PRICES:
      return { ...initialState, ...action.payload };
    default:
      return state;
  }
};
