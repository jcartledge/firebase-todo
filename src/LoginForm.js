import React from 'react';
import {Button} from 'react-bootstrap';

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
    return (<Button bsStyle="primary" block onClick={this.login}>{this.children}</Button>)
  }
}
