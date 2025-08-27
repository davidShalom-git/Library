// src/Components/ProtectedRoute.jsx
import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn } = useAuth();

  return isSignedIn ? children : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;