import { call, put, take } from "redux-saga/effects";
import pricesService from "../services/pricesService";
import { FETCH_INGREDIENTS_FAIL } from "../store/actions/ingredients";
import {
  FETCH_PRICES,
  FETCH_PRICES_SUCCESS,
  updatePrices,
} from "../store/actions/prices";

export function* priceSaga() {
  yield take(FETCH_PRICES);
  const result = yield call(pricesService.getPrices);
  if (result.error) {
    yield put({ type: FETCH_INGREDIENTS_FAIL });
  } else {
    yield put({ type: FETCH_PRICES_SUCCESS });
    yield put(updatePrices(result.data));
  }
}
