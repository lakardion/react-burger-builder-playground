import {
  ADD_INGREDIENT,
  CLEAR_INGREDIENTS,
  REMOVE_INGREDIENT,
  UPDATE_INGREDIENTS,
} from "../actions/ingredients/actionTypes";

const initialIngredients = {
  bacon: 0,
  salad: 0,
  cheese: 0,
  meat: 0,
};
export default (state = initialIngredients, action) => {
  const igsCopy = { ...state };
  switch (action.type) {
    case ADD_INGREDIENT:
      igsCopy[action.payload] += 1;
      return igsCopy;
    case REMOVE_INGREDIENT:
      igsCopy[action.payload] =
        igsCopy[action.payload] > 0 ? igsCopy[action.payload] - 1 : 0;
      return igsCopy;
    case CLEAR_INGREDIENTS:
      return initialIngredients;
    case UPDATE_INGREDIENTS:
      return action.payload;
    default:
      return state;
  }
};
