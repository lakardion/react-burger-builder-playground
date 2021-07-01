import {
  FETCH_INGREDIENTS,
  FETCH_INGREDIENTS_FAIL,
  FETCH_INGREDIENTS_SUCCESS,
} from "../actions/ingredients";
import {
  FETCH_ORDERS,
  FETCH_ORDERS_FAIL,
  FETCH_ORDERS_SUCCESS,
} from "../actions/orders";

const initState = {
  error: false,
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case FETCH_INGREDIENTS:
    case FETCH_ORDERS:
      return { ...state, loading: true };
    case FETCH_INGREDIENTS_SUCCESS:
    case FETCH_ORDERS_SUCCESS:
      return { ...state, error: false, loading: false };
    case FETCH_INGREDIENTS_FAIL:
    case FETCH_ORDERS_FAIL:
      return { ...state, error: true, loading: false };
    default:
      return state;
  }
};
