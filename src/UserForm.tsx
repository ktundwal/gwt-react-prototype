import React, { Component } from "react";

export class UserForm extends Component {
  state = {
    step: 1,
    firstName: ""
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  handleChange = input => e => {};

  render() {
    return <div> Hi this is a user form</div>;
  }
}
