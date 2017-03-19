import React from 'react';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.firebase = props.firebase;
    this.provider = props.provider;
    this.children = props.children;
    this.authStateChanged = props.changed;
    this.handleError = props.authError || (e => { debugger });
  }

  login = () => {
    this.firebase.auth()
      .signInWithPopup(this.provider)
      .then(this.authStateChanged)
      .catch(this.handleError);
  }

  render() {
    return (<button onClick={this.login}>{this.children}</button>)
  }
}
