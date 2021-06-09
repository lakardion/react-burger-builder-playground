import { configureStore } from "@reduxjs/toolkit";
import { ingredientsReducer } from "../reducers/ingredientsReducer";
import priceReducer from "../reducers/priceReducer";

export default configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    price: priceReducer,
  },
});
