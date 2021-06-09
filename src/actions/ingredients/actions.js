import {
  ADD_INGREDIENT,
  CLEAR_INGREDIENTS,
  REMOVE_INGREDIENT,
} from "./actionTypes";

export const addIngredient = (igType) => ({
  type: ADD_INGREDIENT,
  payload: igType,
});
export const removeIngredient = (igType) => ({
  type: REMOVE_INGREDIENT,
  payload: igType,
});
export const clearIngredients = () => ({
  type: CLEAR_INGREDIENTS,
});
