import { FC, useState, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store/store";
import axiosJWT from "../utils/axiosService";
import { USER_API } from "../constants";
import { clearUser } from "../redux/slices/userSlice";
import showToast from "../utils/toast";
import React from "react";

export const ProtectedUserRoute: FC = () => {
  const { isAuthenticated, role } = useAppSelector((state) => state.userSlice);
  console.log(role);
  return isAuthenticated && role == "user" ? (
    <Outlet />
  ) : (
    <Navigate to={"/user/auth/login"} replace />
  );
};

export const ProtectedOwnerRoute: FC = () => {
  const { isAuthenticated, role } = useAppSelector((state) => state.ownerSlice);
  console.log(role);
  return isAuthenticated && role == "owner" ? (
    <Outlet />
  ) : (
    <Navigate to={"/owner/auth/login"} replace />
  );
};
export const ProtectedAdminRoute: FC = () => {
  const { isAuthenticated, role } = useAppSelector((state) => state.userSlice);
  return isAuthenticated && role == "admin" ? (
    <Outlet />
  ) : (
    <Navigate to={"/admin/login"} replace />
  );
};
