import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
import { Route, Navigate } from "react-router-dom";


function PrivateRoute({ element: Element, allowedRoles, ...rest }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return <Route {...rest} element={<Element />} />;
}

export default PrivateRoute;
