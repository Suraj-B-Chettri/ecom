import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsStart } from "../../redux/Products/prodcuts.actions";
import Product from "./Product";
import "./styles.scss";
import FormSelect from "../forms/FormSelect";
import { useHistory, useParams } from "react-router-dom";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const ProductResults = ({}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { filterType } = useParams();
  const { products } = useSelector(mapState);

  useEffect(() => {
    dispatch(fetchProductsStart({ filterType }));
  }, [filterType]);

  const handleFilter = (e) => {
    const nextFilter = e.target.value;
    history.push(`/search/${nextFilter}`);
  };

  if (!Array.isArray(products)) return null;
  if (products.length < 1) {
    return (
      <div className="noSearchResults">
        <p>No search results</p>
      </div>
    );
  }

  const configFilters = {
    options: [
      {
        name: "Show all",
        value: "",
      },
      { name: "Mens", value: "mens" },
      { name: "Womens", value: "womens" },
    ],
    handleChange: handleFilter,
    defaultValue: filterType,
  };
  return (
    <div className="products">
      <h1>Browse Products</h1>

      <FormSelect {...configFilters} />

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
