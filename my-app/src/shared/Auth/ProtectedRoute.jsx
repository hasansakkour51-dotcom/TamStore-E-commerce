// src/shared/auth/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    // إذا ما في توكن → رجّع المستخدم عالـ AuthForm
    return <Navigate to="/authForm" replace />;
  }

  return children;
};

export default ProtectedRoute;
