import React from 'react';
import FontAwesome from 'react-fontawesome';
import LoginForm from './LoginForm';

export default function FacebookLogin (props)  {
  const provider = new props.firebase.auth.FacebookAuthProvider();
  provider.addScope('public_profile,email');
  return (<LoginForm provider={provider} {...props}>
    <FontAwesome name="facebook-official" />
    &nbsp;
    Login with Facebook
  </LoginForm>);
}
