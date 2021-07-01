import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import * as sagas from "../sagas";
import {
  burgerBuilderStatusesReducer,
  ingredientPricesReducer,
  ingredientsReducer,
  ordersReducer,
  pricesReducer,
} from "./reducers";

const sagaMiddleWare = createSagaMiddleware();
const getStore = () => {
  const store = configureStore({
    reducer: {
      ingredients: ingredientsReducer,
      price: pricesReducer,
      burgerBuilderStatus: burgerBuilderStatusesReducer,
      ingredientPrices: ingredientPricesReducer,
      orders: ordersReducer,
    },
    middleware: [sagaMiddleWare],
  });
  Object.values(sagas).forEach(sagaMiddleWare.run.bind(sagaMiddleWare));
  return store;
};
export default getStore;
