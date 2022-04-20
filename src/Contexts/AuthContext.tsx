import React, { createContext, useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { string } from "yup";

interface AuthContextType {
  signin: (accessToken: string) => void;
  signout: () => void;
  getAccessToken: () => string | null;
}

let AuthContext = React.createContext<AuthContextType>(null!);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  let signin = (accessToken: string) => {
    localStorage.setItem("accessToken", accessToken);
  };

  let signout = () => {
    localStorage.removeItem("accessToken");
  };

  let getAccessToken = () => {
    return localStorage.getItem("accessToken");
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
