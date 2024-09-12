import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../components/context/UserAuthContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isCheckingAuth, role } = useAuth();

  console.log("isLoggedIn:", isLoggedIn);
  console.log("isCheckingAuth:", isCheckingAuth);
  console.log("User role:", role);

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  console.log("anish")
  if (!isLoggedIn) {
    return role === "admin" ? (
      <Navigate to="/adminsignin" />
    ) : (
      <Navigate to="/signin" />
    );
  }

  return children;
};

export default ProtectedRoute;
