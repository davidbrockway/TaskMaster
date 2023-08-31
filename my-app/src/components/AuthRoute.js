// AuthRoute.js
import React from "react";
import { Navigate} from "react-router-dom";

function AuthRoute({ element }) {

  const isAuthenticated = localStorage.getItem("userId") !== null;

  
  if (!isAuthenticated) {
    return <Navigate to={'/'} replace/>
  }
  return element;
}

export default AuthRoute;
