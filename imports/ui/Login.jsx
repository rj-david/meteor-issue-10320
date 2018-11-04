import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import React from "react";
import Accounts from "../api/accounts-sample";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      account: null
    };
  }

  createRandomAccount = () => {
    const inputs = {
      username: Random.id()
    };

    Meteor.call("register.user", inputs, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        this.setState({ account: result.username });
      }
    });
  };

  login = () => {
    Accounts.callLoginMethod({
      methodArguments: [{ type: "sample-login", username: this.state.account }],
      validateResult: result => console.log("success", result),
      userCallback: error => console.log("error", error)
    });
  };

  render() {
    return (
      <>
        <h2>Meteor Issue #10320</h2>
        <ol>
          <li>Click Create Random Account button</li>
          <li>Click Login button</li>
          <li>Check server error</li>
        </ol>
        {!this.state.account ? (
          <button onClick={this.createRandomAccount}>
            Create Random Account
          </button>
        ) : (
          <button onClick={this.login}>Login</button>
        )}
      </>
    );
  }
}
