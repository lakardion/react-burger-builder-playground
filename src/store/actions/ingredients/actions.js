import {
  ADD_INGREDIENT,
  CLEAR_INGREDIENTS,
  FETCH_INGREDIENTS,
  FETCH_INGREDIENTS_FAIL,
  FETCH_INGREDIENTS_SUCCESS,
  REMOVE_INGREDIENT,
  UPDATE_INGREDIENTS,
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
export const fetchIngredients = () => ({
  type: FETCH_INGREDIENTS,
});
export const ingredientsFetchError = () => ({ type: FETCH_INGREDIENTS_FAIL });
export const ingredientsFetchSuccess = () => ({
  type: FETCH_INGREDIENTS_SUCCESS,
});

export const updateIngredients = (igs) => ({
  type: UPDATE_INGREDIENTS,
  payload: igs,
});
