import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const PrivateRoute = ({ roles }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    // Redirect unauthenticated user to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && !roles.includes(user.role)) {
    // Redirect unauthorized user to home
    return <Navigate to="/" replace />;
  }

  // Render nested route
  return <Outlet />;
};

export default PrivateRoute;
