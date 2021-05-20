import React, { useState } from "react";
import "./styles.scss";
import Buttons from "../../components/forms/Button";
import FormInput from "../../components/forms/FormInput";
import FormSelect from "../../components/forms/FormSelect";

const Modal = (props) => {
  const { hideModal } = props;
  console.log(hideModal);
  if (hideModal) return null;
  return <div className="modal">{props.children}</div>;
};

export default Modal;
