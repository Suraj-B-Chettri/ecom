import React, { useState } from "react";
import "./styles.scss";
import FormInput from "../forms/FormInput";
import Buttons from "../forms/Button";
import { auth, handleUserProfile } from "../../firebase/utils";
import AuthWrapper from "../AuthWrapper";
import { withRouter } from "react-router-dom";

const Signup = (props) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const resetForm = () => {
    setDisplayName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors([]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      const err = ["Password doesn't match"];
      setErrors(err);
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await handleUserProfile(user, { displayName });
      resetForm();
      props.history.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  const configAuthWrapper = {
    headline: "Register",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      {errors.length > 0 && (
        <ul>
          {errors.map((err, index) => {
            return <li key={index}>{err}</li>;
          })}
        </ul>
      )}
      <div className="formWrap">
        <form onSubmit={handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            placeholder="Full Name"
            onChange={(e) => setDisplayName(e.target.value)}
          />

          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Buttons>register</Buttons>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(Signup);
