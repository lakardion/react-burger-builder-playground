import { call, put, take, takeEvery } from "redux-saga/effects";
import ordersService from "../services/ordersService";
import {
  fetchOrdersFail,
  fetchOrdersSuccess,
  FETCH_ORDERS,
  updateOrders,
} from "../store/actions/orders";

function* fetchOrdersSaga() {
  const { error, data } = yield call(ordersService.getOrders);
  if (error) {
    yield put(fetchOrdersFail());
  } else {
    yield put(fetchOrdersSuccess());
    yield put(updateOrders(data));
  }
}
export function* ordersSaga() {
  yield takeEvery(FETCH_ORDERS, fetchOrdersSaga);
}
