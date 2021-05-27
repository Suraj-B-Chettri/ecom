import React, { useState, useEffect } from "react";
import FormInput from "../forms/FormInput";
import { CountryDropdown } from "react-country-region-selector";
import "./styles.scss";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Buttons from "../forms/Button";
import { apiInstance } from "../../Utils";
import {createStructuredSelector} from 'reselect';
import {selectCartItems, selectCartItemsCount, selectCartTotal} from '../../redux/Cart/cart.selectors'; 
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/Cart/cart.actions";
import { useHistory } from "react-router-dom";
import { saveOrderHistory } from "../../redux/Orders/orders.actions";

const initialAddressState = {
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
};

const mapState = createStructuredSelector({
  total: selectCartTotal,
  itemCount: selectCartItemsCount,
  cartItems : selectCartItems,
})
const PaymentDetails = () => {

  const {total, itemCount, cartItems} = useSelector(mapState);
  useEffect(()=> {
    if(itemCount < 1) {
      history.push("/dashboard");
    }

  }, [itemCount])

  const dispatch = useDispatch();
  const history = useHistory();
  const elements = useElements();
  const stripe = useStripe();
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [recipientName, setRecipientName] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");

  const handleFormSubmit = async (evt) => {
    evt.preventDefault();
    const cardElement = elements.getElement("card");

    if (
      !shippingAddress.line1 ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.postal_code ||
      !shippingAddress.country ||
      !billingAddress.line1 ||
      !billingAddress.city ||
      !billingAddress.state ||
      !billingAddress.postal_code ||
      !billingAddress.country ||
      !recipientName ||
      !nameOnCard
    ) {
      return;
    }

    apiInstance.post('/payments/create', {
      amount: total * 100,
      shipping : {
        name: recipientName,
        address:{
          ...shippingAddress
        }
      }
    }).then(({data: clientSecret})=>{

      stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details:{
          name: nameOnCard,
          address: { ...billingAddress}
        }
      }).then(({paymentMethod})=> {
        stripe.confirmCardPayment(clientSecret, {payment_method: paymentMethod.id
        })
        .then(({paymentIntent}) => {
          // console.log(paymentIntent);
          // import {saveOrderHistory} from './../../redux/Orders/orders.actions';
          const configOrder = {
            orderTotal: total,
            orderItems: cartItems.map(item => {
              const {documentID, productThumbnail, productName, productPrice, quantity} = item;

              return {
                documentID, 
                productThumbnail,
                 productName,
                  productPrice,
                   quantity
              }
            })
          }
          dispatch(
            saveOrderHistory(configOrder))
        })
      })
    })

   
  };

  const handleShipping = (evt) => {
    const { name, value } = evt.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const handleBilling = (evt) => {
    const { name, value } = evt.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };

  const configCardElement = {
    iconStyle: "solid",
    style: {
      base: {
        fontSize: "16px",
      },
    },
    hidePostalCode: true,
  };

  return (
    <div className="paymentDetails">
      <form onSubmit={handleFormSubmit}>
        <div className="group">
          <h2>Shipping Address</h2>

          <FormInput
            required
            type="text"
            placeholder="Recipient Name"
            name="recipientName"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
          />

          <FormInput
            required
            type="text"
            name="line1"
            placeholder="Line 1"
            value={shippingAddress.line1}
            onChange={(e) => handleShipping(e)}
          />

          <FormInput
            type="text"
            name="line2"
            placeholder="Line 2"
            value={shippingAddress.line2}
            onChange={(e) => handleShipping(e)}
          />

          <FormInput
            required
            type="text"
            name="city"
            placeholder="City"
            value={shippingAddress.city}
            onChange={(e) => handleShipping(e)}
          />

          <FormInput
            required
            type="text"
            name="state"
            placeholder="State"
            value={shippingAddress.state}
            onChange={(e) => handleShipping(e)}
          />

          <FormInput
            required
            type="text"
            name="postal_code"
            placeholder="Postal code"
            value={shippingAddress.postal_code}
            onChange={(e) => handleShipping(e)}
          />

          <div className="formRow checkoutInput">
            <CountryDropdown
              required
              valueType="short"
              onChange={(val) =>
                handleShipping({
                  target: { name: "country", value: val },
                })
              }
              value={shippingAddress.country}
            />
          </div>
        </div>

        <div className="group">
          <h2>BIlling Address</h2>

          <FormInput
            required
            type="text"
            name="nameOnCard"
            placeholder=" Name on Card"
            value={nameOnCard}
            onChange={(e) => setNameOnCard(e.target.value)}
          />

          <FormInput
            required
            type="text"
            name="line1"
            placeholder="Line 1"
            onChange={(e) => handleBilling(e)}
            value={billingAddress.line1}
          />

          <FormInput
            type="text"
            name="line2"
            placeholder="Line 2"
            value={billingAddress.line2}
            onChange={(e) => handleBilling(e)}
          />

          <FormInput
            required
            type="text"
            name="city"
            placeholder="City"
            value={billingAddress.city}
            onChange={(e) => handleBilling(e)}
          />

          <FormInput
            required
            type="text"
            name="state"
            placeholder="State"
            value={billingAddress.state}
            onChange={(e) => handleBilling(e)}
          />

          <FormInput
            required
            type="text"
            name="postal_code"
            placeholder="Postal code"
            value={billingAddress.postal_code}
            onChange={(e) => handleBilling(e)}
          />

          <div className="formRow checkoutInput">
            <CountryDropdown
              required
              valueType="short"
              onChange={(val) =>
                handleBilling({
                  target: { name: "country", value: val },
                })
              }
              value={billingAddress.country}
            />
          </div>
        </div>

        <div className="group">
          <h2>Card Details</h2>
          <CardElement options={configCardElement} />
        </div>

        <Buttons type="submit" >Submit</Buttons>
      </form>
    </div>
  );
};

export default PaymentDetails;
