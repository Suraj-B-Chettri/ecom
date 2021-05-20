import React, { useEffect, useState } from "react";
import "./styles.scss";
import Buttons from "../../components/forms/Button";
import FormInput from "../../components/forms/FormInput";
import FormSelect from "../../components/forms/FormSelect";
import Modal from "../../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductStart,
  deleteProductsStart,
  fetchProductsStart,
} from "../../redux/Products/prodcuts.actions";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const Admin = (props) => {
  const [hideModal, setHideModal] = useState(true);
  const [productCategory, setProductCategory] = useState("mens");
  const [productName, setProductName] = useState("");
  const [productThumbnail, setProductThumbnail] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const dispatch = useDispatch();
  const { products } = useSelector(mapState);

  const toggleModal = () => setHideModal(!hideModal);

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);

  const resetForm = () => {
    setHideModal(true);
    setProductCategory("mens");
    setProductName("");
    setProductThumbnail("");
    setProductPrice(0);
  };

  const configModal = {
    hideModal,
    toggleModal,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addProductStart({
        productCategory,
        productName,
        productThumbnail,
        productPrice,
      })
    );
    resetForm();
  };

  return (
    <div className="admin">
      <div className="callToActions">
        <ul>
          <li>
            <Buttons
              className="toggleProductButton"
              onClick={() => toggleModal()}
            >
              Add nw Product
            </Buttons>
          </li>
        </ul>
      </div>

      <Modal {...configModal}>
        <div className="addNewProductForm">
          <form onSubmit={handleSubmit}>
            <h2>Add new product</h2>

            <FormSelect
              label="Category"
              options={[
                {
                  value: "mens",
                  name: "Mens",
                },
                {
                  value: "womens",
                  name: "Womens",
                },
              ]}
              handleChange={(e) => setProductCategory(e.target.value)}
            />

            <FormInput
              label="Name"
              type="text"
              value={productName}
              handleChange={(e) => setProductName(e.target.value)}
            />

            <FormInput
              label="Main image URL"
              type="url"
              value={productThumbnail}
              handleChange={(e) => setProductThumbnail(e.target.value)}
            />

            <FormInput
              label="Price"
              type="number"
              value={productPrice}
              handleChange={(e) => setProductPrice(e.target.value)}
            />

            <Buttons onClick={handleSubmit}>Add Product</Buttons>
          </form>
        </div>
      </Modal>

      <div className="manageProducts">
        <table border="0" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <th>
                <h1>Manage Products</h1>
              </th>
            </tr>
            <tr>
              <td>
                <table
                  className="results"
                  border="0"
                  cellPadding="10"
                  cellSpacing="0"
                >
                  <tbody>
                    {products.map((product, index) => {
                      const {
                        productName,
                        productThumbnail,
                        productPrice,
                        documentID,
                      } = product;
                      return (
                        <tr key={index}>
                          <td>
                            <img
                              className="thumb"
                              src={productThumbnail}
                              alt={productName}
                            />
                          </td>
                          <td>{productName}</td>
                          <td>$ {productPrice}</td>
                          <td>
                            <Buttons
                              onClick={() =>
                                dispatch(deleteProductsStart(documentID))
                              }
                            >
                              delete
                            </Buttons>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
