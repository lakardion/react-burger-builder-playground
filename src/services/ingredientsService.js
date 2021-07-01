import { get } from "./apiCallService";

export const ingredientService = {
  getIngredients: async () => get("ingredients"),
};
