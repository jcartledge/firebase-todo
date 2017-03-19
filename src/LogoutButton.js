import React from 'react';

export default class LogoutButton extends React.Component {
  constructor(props) {
    super(props);
    this.firebase = props.firebase;
    this.children = props.children;
    this.authStateChanged = props.changed;
    this.handleError = props.authError || (e => { debugger });

  }

  logout = () => {
    this.firebase.auth()
      .signOut()
      .then(this.authStateChanged)
      .catch(this.handleError);
  }

  render() {
    return (<button onClick={this.logout}>{this.children || 'Logout'}</button>)
  }
}
