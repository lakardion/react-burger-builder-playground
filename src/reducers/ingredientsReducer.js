import {
  ADD_INGREDIENT,
  CLEAR_INGREDIENTS,
  REMOVE_INGREDIENT,
} from "../actions/ingredients/actionTypes";

const initialIngredients = {
  bacon: 0,
  salad: 0,
  cheese: 0,
  meat: 0,
};
export const ingredientsReducer = (state = initialIngredients, action) => {
  let igsCopy;
  switch (action.type) {
    case ADD_INGREDIENT:
      igsCopy = { ...state };
      igsCopy[action.payload] += 1;
      return igsCopy;
    case REMOVE_INGREDIENT:
      igsCopy = { ...state };
      igsCopy[action.payload] =
        igsCopy[action.payload] > 0 ? igsCopy[action.payload] - 1 : 0;
      return igsCopy;
    case CLEAR_INGREDIENTS:
      return initialIngredients;
    default:
      return state;
  }
};
