import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchProductStart,
  setProduct,
} from "../../redux/Products/products.actions";
import "./styles.scss";
import Buttons from "../forms/Button";
import { addProduct } from "../../redux/Cart/cart.actions";

const mapState = (state) => ({
  product: state.productsData.product,
});

const ProductCard = ({}) => {
  const dispatch = useDispatch();
  const { productID } = useParams();
  const { product } = useSelector(mapState);

  const { productName, productThumbnail, productPrice, productDesc } = product;

  useEffect(() => {
    dispatch(fetchProductStart(productID));
    return () => {
      dispatch(setProduct({}));
    };
  }, []);

  const handleAddToCart = (product) => {
    console.log(product);
    if (!product) return;
    dispatch(addProduct((product = { ...product, documentID: productID })));
  };

  const configAddToCartBtn = {
    type: "button",
  };
  return (
    <div className="productCard">
      <div className="hero">
        <img src={productThumbnail} alt={productName} />
      </div>
      <div className="productDetails">
        <ul>
          <li>
            <h1>{productName}</h1>
          </li>
          <li>
            <span>$ {productPrice}</span>
          </li>

          <li>
            <div className="addToCart">
              <Buttons
                {...configAddToCartBtn}
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </Buttons>
            </div>
          </li>

          <li>
            <span dangerouslySetInnerHTML={{ __html: productDesc }} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductCard;
