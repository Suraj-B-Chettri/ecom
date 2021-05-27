import { all, call } from "redux-saga/effects";
import ordersSagas from "./Orders/orders.sagas";
import productsSagas from "./Products/products.sagas";
import userSagas from "./User/userSagas";

export default function* rootSaga() {
  yield all([call(userSagas), call(productsSagas), call(ordersSagas)]);
}
