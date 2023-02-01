import React from 'react';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      InisClicked: false,
      UpisClicked: false
    };
    this.isClicked1 = this.isClicked1.bind(this);
    this.exit1 = this.exit1.bind(this);
    this.isClicked2 = this.isClicked2.bind(this);
    this.exit2 = this.exit2.bind(this);
  }

  isClicked1() {
    this.setState({ InisClicked: true });
  }

  exit1() {
    this.setState({ InisClicked: false });
  }

  isClicked2() {
    this.setState({ UpisClicked: true });
  }

  exit2() {
    this.setState({ UpisClicked: false });
  }

  render() {
    if (this.state.InisClicked === true) {
      return (
        <div className="overlay2">
          <div className="in-menu">
            <form className="sign-in-form">
              <i onClick={this.exit1} className="running-exit fa-solid fa-person-running" />
              <div className="all-text-sign">
                <h4>Returning User? Sign in now!</h4>
                <label>Username<input className="text-user" type="text" /></label>
                <label>Password<input className="text-password" type="password" /></label>
                <div> <button className="sign-button" type="submit">Sign In</button></div>
              </div>
            </form>
          </div>
        </div>
      );
    }
    if (this.state.UpisClicked === true) {
      return (
        <div className="overlay2">
          <div className="in-menu">
            <form className="sign-in-form">
              <i onClick={this.exit2} className="running-exit fa-solid fa-person-running" />
              <div className="all-text-sign">
                <h3>New User? Sign up now!</h3>
                <label>Username<input className="text-user" type="text" /></label>
                <label>Password<input className="text-password" type="password" /></label>
                <div> <button className="sign-button" type="submit">Sign Up</button></div>
              </div>
            </form>

          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="background-container">
            <div className="bg-img background" />
            <button onClick={this.isClicked1} className="sign-in-but"> Sign-In </button>
            <button onClick={this.isClicked2}className="sign-up-but">Sign-Up </button>
          </div>
        </div>
      );
    }
  }
}
