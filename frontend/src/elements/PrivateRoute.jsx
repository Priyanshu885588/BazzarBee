import React from "react";
import { Outlet, Navigate } from "react-router-dom";
export const PrivateRoute = () => {
  const token = localStorage.getItem("BazzarBeeToken");

  return token ? <Outlet /> : <Navigate to="/userlogin" replace />;
};
