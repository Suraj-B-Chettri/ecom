import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsStart } from "../../redux/Products/prodcuts.actions";
import Product from "./Product";
import "./styles.scss";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const ProductResults = ({}) => {
  const dispatch = useDispatch();
  const { products } = useSelector(mapState);

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);
  if (!Array.isArray(products)) return null;
  if (products.length < 1) {
    return (
      <div className="noSearchResults">
        <p>No search results</p>
      </div>
    );
  }
  return (
    <div className="products">
      <h1>Browse Products</h1>

      <div className="productsResults">
        {products.map((product, pos) => {
          console.log("afa");
          const { productName, productThumbnail, productPrice } = product;

          const configProduct = {
            productThumbnail,
            productName,
            productPrice,
          };
          return <Product {...configProduct} />;
        })}
      </div>
    </div>
  );
};

export default ProductResults;
