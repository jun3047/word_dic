import React from 'react';
import { Navigate } from 'react-router-dom';
import useUserStore from '../recoil/user';

const PrivateRoute = ({ component: Component }) => {
  const { userToken } = useUserStore();
  return userToken ? <Component /> : <Navigate replace to="/login" />;
};

export default PrivateRoute;