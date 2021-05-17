import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { auth } from "../../firebase/utils";
import AuthWrapper from "../AuthWrapper";
import Buttons from "../forms/Button";
import FormInput from "../forms/FormInput";

import "./styles.scss";

const initialState = {
  email: "",
  errors: [],
};

class EmailPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { email } = this.state;

      const config = {
        url: "http://localhost:3000/login",
      };

      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          this.props.history.push("/login");
          console.log("password reset");
        })
        .catch((err) => {
          const error = [err.code];
          this.setState({
            errors: error,
          });
          console.log("something went wrong");
        });
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    const { email, errors } = this.state;
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
          <form onSubmit={this.handleSubmit}>
            <FormInput
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={this.handleChange}
            />
            <Buttons type="submit">Submit</Buttons>
          </form>
        </div>
        {/* 
                <Buttons/> */}
      </AuthWrapper>
    );
  }
}

export default withRouter(EmailPassword);
