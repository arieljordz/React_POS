import React, { useEffect, useState } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function RequireAuth() {
  const { auth } = useAuth();
  const location = useLocation();
  const [userId, setUserId] = useState(sessionStorage.getItem("UserId"));

  //const isAuthenticated = auth;
  //console.log(isAuthenticated);
  console.log(userId);
  const _userId = userId == null? 0: userId;

  if (_userId !== 0) {
    return <Outlet />;
  } else {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
}

export default RequireAuth;
