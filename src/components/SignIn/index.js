import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./styles.scss";

import Buttons from "../forms/Button";
import FormInput from "../forms/FormInput";

import AuthWrapper from "../AuthWrapper";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  emailSignInStart,
  googleSignInStart,
} from "../../redux/User/user.actions";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const SignIn = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(mapState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (currentUser) {
      resetForm();
      history.push("/");
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(emailSignInStart({ email, password }));
  };

  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart());
  };

  const configAuthWrapper = {
    headline: "login",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={(e) => setEmail(e.target.value)}
          />

          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            handleChange={(e) => setPassword(e.target.value)}
          />

          <Buttons type="submit">Sign</Buttons>

          <div className="socialSignin">
            <div className="row">
              <Buttons onClick={handleGoogleSignIn}>
                Sign in with Google
              </Buttons>
            </div>
          </div>

          <div className="links">
            <Link to="/recovery">Reset Password</Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default SignIn;
