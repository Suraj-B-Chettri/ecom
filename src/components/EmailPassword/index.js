import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { auth } from "../../firebase/utils";
import AuthWrapper from "../AuthWrapper";
import Buttons from "../forms/Button";
import FormInput from "../forms/FormInput";

import "./styles.scss";

const EmailPassword = (props) => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  // const resetForm = () => {
  //   setEmail("");
  //   setErrors([]);
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        url: "http://localhost:3000/login",
      };

      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          props.history.push("/login");
          console.log("password reset");
        })
        .catch((err) => {
          const error = [err.code];
          setErrors(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const configAuthWrapper = {
    headline: "Email Password",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        {errors.length > 0 && (
          <ul>
            {errors.map((e, index) => {
              return <li key={index}>{e}</li>;
            })}
          </ul>
        )}
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Buttons type="submit">Submit</Buttons>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(EmailPassword);
