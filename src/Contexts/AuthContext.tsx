import React, { createContext, useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";

interface AuthContextType {
  signin: (accessToken: string) => void;
  signout: () => void;
  getAccessToken: () => string | null;
  userName: (Name: string) => void;
  getUserName: () => string | null;
}

let AuthContext = React.createContext<AuthContextType>(null!);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  let signin = (accessToken: string) => {
    sessionStorage.setItem("accessToken", accessToken);
  };

  let userName = (Name: string) => {
    sessionStorage.setItem("Name", Name);
  };

  let signout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("Name");
  };

  let getAccessToken = () => {
    return sessionStorage.getItem("accessToken");
  };

  let getUserName = () => {
    return sessionStorage.getItem("Name");
  };

  let value = { signin, signout, getAccessToken, userName, getUserName };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth, AuthProvider };
