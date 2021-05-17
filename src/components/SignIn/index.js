import React, { Component } from "react";
import "./styles.scss";

import Buttons from "../forms/Button";
import FormInput from "../forms/FormInput";

import { signInWithGoogle } from "../../firebase/utils";
import { auth, handleUserProfile } from "../../firebase/utils";

const initialState = {
  email: "",
  password: "",
};

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ ...initialState });
    } catch (e) {
      console.log(e);
    }
  };

  handleChange(e) {
    const { name, value } = e.target;
    console.log(name, value);
    console.log(this.state);
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { email, password } = this.state;

    return (
      <div className="signin">
        <div className="wrap">
          <h2>Login</h2>

          <div className="formWrap">
            <form onSubmit={this.handleSubmit}>
              <FormInput
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                handleChange={this.handleChange}
              />

              <FormInput
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                handleChange={this.handleChange}
              />

              <Buttons type="submit">Sign</Buttons>

              <div className="socialSignin">
                <div className="row">
                  <Buttons onClick={signInWithGoogle}>
                    Sign in with Google
                  </Buttons>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
