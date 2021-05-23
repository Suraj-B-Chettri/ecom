import { all, call, takeLatest, put } from "redux-saga/effects";
import { auth } from "../../firebase/utils";
import {
  fetchProductsStart,
  setProduct,
  setProducts,
} from "./products.actions";
import {
  handleAddProduct,
  handleDeleteProduct,
  handleFetchProduct,
  handleFetchProducts,
} from "./products.helpers";
import productsTypes from "./products.types";

export function* addProduct({ payload }) {
  try {
    const timestamp = new Date();
    yield handleAddProduct({
      ...payload,
      productAdminUserUID: auth.currentUser.uid,
      createdDate: timestamp,
    });
    yield put(fetchProductsStart());
  } catch (err) {}
}

export function* onAddProductStart() {
  yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct);
}

export function* fetchProducts({ payload }) {
  try {
    const products = yield handleFetchProducts(payload);
    yield put(setProducts(products));
  } catch (err) {
    // console.log(err)
  }
}

export function* onfetchProductsStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts);
}

export function* fetchProduct({ payload }) {
  try {
    const product = yield handleFetchProduct(payload);
    yield put(setProduct(product));
  } catch (err) {
    // console.log(err)
  }
}

export function* onfetchProductStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCT_START, fetchProduct);
}

export function* deleteProduct({ payload }) {
  try {
    yield handleDeleteProduct(payload);
    yield put(fetchProductsStart());
  } catch (err) {
    // console.log(err)
  }
}

export function* onDeleteProductStart() {
  yield takeLatest(productsTypes.DELETE_PRODUCT_START, deleteProduct);
}

export default function* productsSagas() {
  yield all([
    call(onAddProductStart),
    call(onfetchProductsStart),
    call(onDeleteProductStart),
    call(onfetchProductStart),
  ]);
}
