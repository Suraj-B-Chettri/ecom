import { combineReducers } from "redux";
import productsReducer from "./Products/products.reducers";
import userReducer from "./User/user.reducer";

export default combineReducers({
  user: userReducer,
  productsData: productsReducer,
});
