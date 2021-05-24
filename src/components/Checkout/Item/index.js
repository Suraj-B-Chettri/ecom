import React from "react";
import { useDispatch } from "react-redux";
import {
  addProduct,
  reduceCartItem,
  removeCartItem,
} from "../../../redux/Cart/cart.actions";

const Item = (product) => {
  const dispatch = useDispatch();
  const { productName, productThumbnail, productPrice, quantity, documentID } =
    product;

  const handleRemoveCartItem = (documentID) => {
    dispatch(removeCartItem({ documentID }));
  };

  const handleAddProduct = (product) => {
    dispatch(addProduct(product));
  };

  const handleReduceCartItem = (product) => {
    dispatch(reduceCartItem(product));
  };

  return (
    <table className="cartItem">
      <tbody>
        <tr>
          <td>
            <img src={productThumbnail} alt={productName} />
          </td>
          <td>{productName}</td>
          <td>
            <span
              onClick={() => handleReduceCartItem(product)}
              className="cartBtn arrows"
            >{`<`}</span>
            <span>{quantity}</span>
            <span
              onClick={() => handleAddProduct(product)}
              className="cartBtn arrows"
            >{`>`}</span>
          </td>
          <td>
            <span>{productName}</span>
          </td>
          <td>${productPrice}</td>
          <td align="center">
            <span
              className="cartBtn"
              onClick={() => handleRemoveCartItem(documentID)}
            >
              X
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Item;
