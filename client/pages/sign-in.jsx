import React from 'react';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      InisClicked: false,
      UpisClicked: false,
      signInUser: '',
      signInPw: '',
      signUpUser: '',
      signUpPw: '',
      alert: ''
    };
    this.isClicked1 = this.isClicked1.bind(this);
    this.exit1 = this.exit1.bind(this);
    this.isClicked2 = this.isClicked2.bind(this);
    this.exit2 = this.exit2.bind(this);
    this.handleSignUpUser = this.handleSignUpUser.bind(this);
    this.handleSignUpPw = this.handleSignUpPw.bind(this);
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
    this.handleSignInSubmit = this.handleSignInSubmit.bind(this);
    this.handleSignInUser = this.handleSignInUser.bind(this);
    this.handleSignInPw = this.handleSignInPw.bind(this);
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

  handleSignUpUser(event) {
    this.setState({ signUpUser: event.target.value });
  }

  handleSignUpPw(event) {
    this.setState({ signUpPw: event.target.value });
  }

  handleSignInUser(event) {
    this.setState({ signInUser: event.target.value });
  }

  handleSignInPw(event) {
    this.setState({ signInPw: event.target.value });
  }

  handleSignUpSubmit(event) {
    event.preventDefault();
    const signUpCredentials = {
      username: this.state.signUpUser,
      password: this.state.signUpPw
    };
    fetch('/api/auth/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signUpCredentials)
    })
      .then(res =>
        res.json())
      .then(data => {
        if (data.error) { this.setState({ alert: data.error }); }
        if (data.UserID) { this.setState({ alert: 'Successfully created an account!' }); }
      })
      .catch(err => console.error(err));
    this.setState({ signUpUser: '', signUpPw: '' }
    );
  }

  handleSignInSubmit(event) {
    event.preventDefault();
    const signInCredentials = {
      username: this.state.signInUser,
      password: this.state.signInPw
    };
    fetch('/api/auth/sign-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signInCredentials)
    })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          this.props.updateToken(window.localStorage.getItem('Token'));
          window.localStorage.setItem('Token', data.token);
          window.localStorage.setItem('UserID', data.user.UserID);
          window.location.hash = '#home';
        } else {
          this.setState({ alert: data.error });
        }
      })
      .catch(err => console.error(err));
  }

  render() {
    if (this.state.InisClicked === true) {
      if (this.state.alert === 'Invalid login.') {
        return (
          <div className="overlay2">
            <div className="in-menu">
              <form method='post' onSubmit={this.handleSignInSubmit} className="sign-in-form">
                <i onClick={this.exit1} className="running-exit fa-solid fa-person-running" />
                <div className="all-text-sign">
                  <h4>Returning User? Sign in now!</h4>
                  <label htmlFor="sign-in-text">Username<input required name="sign-in-text" id="sign-in-text" className="text-user" type="text" onChange={this.handleSignInUser} value={this.state.signInUser} /></label>
                  <label htmlFor="sign-in-pw">Password<input required name="sign-in-pw" id="sign-in-pw" className="text-password" type="password" onChange={this.handleSignInPw} value={this.state.signInPw} /></label>
                  <h6 className="red">{this.state.alert}</h6>
                  <div> <button className="sign-button" type="submit">Sign In</button></div>
                </div>
              </form>
            </div>
          </div>
        );
      } else {
        return (
          <div className="overlay2">
            <div className="in-menu">
              <form method='post' onSubmit={this.handleSignInSubmit} className="sign-in-form">
                <i onClick={this.exit1} className="running-exit fa-solid fa-person-running" />
                <div className="all-text-sign">
                  <h4>Returning User? Sign in now!</h4>
                  <label htmlFor="sign-in-text">Username<input required name="sign-in-text" id="sign-in-text" className="text-user" type="text" onChange={this.handleSignInUser} value={this.state.signInUser} /></label>
                  <label htmlFor="sign-in-pw">Password<input required name="sign-in-pw" id="sign-in-pw" className="text-password" type="password" onChange={this.handleSignInPw} value={this.state.signInPw}/></label>
                  <h6 className="blue">Please enter a valid username and password.</h6>
                  <div> <button className="sign-button" type="submit">Sign In</button></div>
                </div>
              </form>
            </div>
          </div>
        );
      }
    }
    if (this.state.UpisClicked === true) {
      if (this.state.alert === 'Username already exists.') {
        return (
          <div className="overlay2">
            <div className="in-menu">
              <form method="post" onSubmit={this.handleSignUpSubmit} className="sign-in-form">
                <i onClick={this.exit2} className="running-exit fa-solid fa-person-running" />
                <div className="all-text-sign">
                  <h3>New User? Sign up now!</h3>
                  <label htmlFor="sign-up-user">Username<input required name="sign-up-user" id="sign-up-user" className="text-user" type="text" onChange={this.handleSignUpUser} value={this.state.signUpUser}/></label>
                  <label htmlFor="sign-up-pw">Password<input required name="sign-up-pw" id="sign-up-pw" className="text-password" type="password" onChange={this.handleSignUpPw} value={this.state.signUpPw} /></label>
                  <h6 className="red">{this.state.alert}</h6>
                  <div> <button className="sign-button" type="submit">Sign Up</button></div>
                </div>
              </form>
            </div>
          </div>
        );
      } if (this.state.alert === 'Successfully created an account!') {
        return (
          <div className="overlay2">
            <div className="in-menu">
              <form method="post" onSubmit={this.handleSignUpSubmit} className="sign-in-form">
                <i onClick={this.exit2} className="running-exit fa-solid fa-person-running" />
                <div className="all-text-sign">
                  <h3>New User? Sign up now!</h3>
                  <label htmlFor="sign-up-user">Username<input required name="sign-up-user" id="sign-up-user" className="text-user" type="text" onChange={this.handleSignUpUser} value={this.state.signUpUser} /></label>
                  <label htmlFor="sign-up-pw">Password<input required name="sign-up-pw" id="sign-up-pw" className="text-password" type="password" onChange={this.handleSignUpPw} value={this.state.signUpPw} /></label>
                  <h6 className="green">{this.state.alert}</h6>
                  <div> <button className="sign-button" type="submit">Sign Up</button></div>
                </div>
              </form>
            </div>
          </div>
        );
      } else {
        return (
          <div className="overlay2">
            <div className="in-menu">
              <form method="post" onSubmit={this.handleSignUpSubmit} className="sign-in-form">
                <i onClick={this.exit2} className="running-exit fa-solid fa-person-running" />
                <div className="all-text-sign">
                  <h3>New User? Sign up now!</h3>
                  <label htmlFor="sign-up-user">Username<input required name="sign-up-user" id="sign-up-user" className="text-user" type="text" onChange={this.handleSignUpUser} value={this.state.signUpUser} /></label>
                  <label htmlFor="sign-up-pw">Password<input required name="sign-up-pw" id="sign-up-pw" className="text-password" type="password" onChange={this.handleSignUpPw} value={this.state.signUpPw} /></label>
                  <h6 className="blue">Please enter a username and password</h6>
                  <div> <button className="sign-button" type="submit">Sign Up</button></div>
                </div>
              </form>
            </div>
          </div>
        );
      }
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
