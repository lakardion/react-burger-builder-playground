import { call, put, take } from "redux-saga/effects";
import { ingredientService } from "../services/ingredientsService";
import {
  FETCH_INGREDIENTS,
  ingredientsFetchError,
  ingredientsFetchSuccess,
  updateIngredients,
} from "../store/actions/ingredients";
import { updateTotalPrice } from "../store/actions/prices";

export function* ingredientsSaga() {
  yield take(FETCH_INGREDIENTS);
  const result = yield call(ingredientService.getIngredients);
  if (result.error) {
    yield put(ingredientsFetchError());
  } else {
    yield put(ingredientsFetchSuccess());
    yield put(updateIngredients(result.data));
  }
}
