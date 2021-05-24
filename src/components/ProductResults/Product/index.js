import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { addProduct } from "../../../redux/Cart/cart.actions";
import Buttons from "../../forms/Button";

const Product = (product) => {
  const { documentID, productName, productThumbnail, productPrice } = product;
  const history = useHistory();
  const dispatch = useDispatch();
  if (
    !documentID ||
    !productThumbnail ||
    !productName ||
    typeof productPrice === "undefined"
  )
    return null;

  const configAddToCart = {
    type: "button",
  };

  const handleAddToCart = (product) => {
    if (!product) return;
    dispatch(addProduct(product));
    history.push("/cart");
  };

  return (
    <div className="product">
      <div className="thumb">
        <Link to={`/product/${documentID}`}>
          <img src={productThumbnail} alt={productName} />
        </Link>
      </div>

      <div className="details">
        <ul>
          <li>
            <Link to={`/product/${documentID}`}>
              <span className="name">{productName}</span>
            </Link>
          </li>
          <li>
            <span className="price">{productPrice}</span>
          </li>

          <li>
            <div className="addToCart">
              <Buttons
                {...configAddToCart}
                onClick={() => handleAddToCart(product)}
              >
                {" "}
                Add to cart
              </Buttons>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Product;
