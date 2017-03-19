import React from 'react';
import LoginForm from './LoginForm';

export default function GoogleLogin (props)  {
  const provider = new props.firebase.auth.GoogleAuthProvider();
  return (<LoginForm provider={provider} {...props}>Login with Google</LoginForm>);
}
