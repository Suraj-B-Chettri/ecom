import React from "react";
import { Link } from "react-router-dom";
import Buttons from "../../forms/Button";

const Product = ({
  documentID,
  productName,
  productThumbnail,
  productPrice,
}) => {
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
              <Buttons {...configAddToCart}> Add to cart</Buttons>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Product;
