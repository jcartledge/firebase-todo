import React from 'react';
import FontAwesome from 'react-fontawesome';
import LoginForm from './LoginForm';

export default function GoogleLogin (props)  {
  const provider = new props.firebase.auth.GoogleAuthProvider();
  return (<LoginForm provider={provider} {...props}>
    <FontAwesome name="google" />
    &nbsp;
    Login with Google
  </LoginForm>);
}
