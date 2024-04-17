import React from 'react';
import { Navigate } from 'react-router-dom';
import useUserStore from '../recoil/user';

const LogoutRoute = ({ component: Component }) => {
  const { userToken } = useUserStore();
  return userToken ? <Navigate replace to="/" /> : <Component />;
};

export default LogoutRoute;