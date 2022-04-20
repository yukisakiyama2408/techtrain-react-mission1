import React, { createContext, useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";

interface AuthContextType {
  signin: (accessToken: string) => void;
  signout: () => void;
  getAccessToken: () => string | null;
}

let AuthContext = React.createContext<AuthContextType>(null!);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  let signin = (accessToken: string) => {
    sessionStorage.setItem("accessToken", accessToken);
  };

  let signout = () => {
    sessionStorage.removeItem("accessToken");
  };

  let getAccessToken = () => {
    return sessionStorage.getItem("accessToken");
  };

  //useEffect(() => {
  //const Item = localStorage.getItem("user");
  //if (Item) {
  //setUser(Item);
  //}
  //}, []);
  let value = { signin, signout, getAccessToken };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth, AuthProvider };
