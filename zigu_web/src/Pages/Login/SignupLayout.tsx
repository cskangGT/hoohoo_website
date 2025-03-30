import React from 'react';
import {Outlet} from 'react-router-dom';
import {SignupProvider} from '../../context/SignupContext';

const SignupLayout = () => {
  return (
    <SignupProvider>
      <Outlet />
    </SignupProvider>
  );
};

export default SignupLayout;
