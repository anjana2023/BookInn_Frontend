import { FC } from "react";
import { useAppSelector } from "../redux/store/store";
import { Navigate, Outlet } from "react-router-dom";
import React from "react";

export const PublicRoutes: FC = () => {
  const { isAuthenticated, role } = useAppSelector((state) => state.userSlice);
  if (role === "user") {
    return isAuthenticated ? <Navigate to={"/"} replace /> : <Outlet />;
  } else if (role === "admin") {
    return isAuthenticated ? <Navigate to={"/admin"} replace /> : <Outlet />;
  } 
    return <Outlet />;
  
};

export const PublicOwnerRoutes: FC = () => {
  const { isAuthenticated, role } = useAppSelector((state) => state.ownerSlice);
  if (role === "owner") {
    return isAuthenticated ? <Navigate to={"/owner"} replace /> : <Outlet />;
  } 
    return <Outlet />;
};
