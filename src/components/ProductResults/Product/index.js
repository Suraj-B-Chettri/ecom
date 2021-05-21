import React from "react";
import Buttons from "../../forms/Button";

const Product = ({ productName, productThumbnail, productPrice }) => {
  if (!productThumbnail || !productName || typeof productPrice === "undefined")
    return null;

  const configAddToCart = {
    type: "button",
  };

  return (
    <div className="product">
      <div className="thumb">
        <img src={productThumbnail} alt={productName} />
      </div>

      <div className="details">
        <ul>
          <li>
            <span className="name">{productName}</span>
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
