import React, { useContext, useState, useEffect } from "react";

interface AuthContextType {
  signin: (accessToken: string) => void;
  signout: () => void;
  accessToken: string | null;
}

let AuthContext = React.createContext<AuthContextType>(null!);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  let signin = (accessToken: string) => {
    sessionStorage.setItem("accessToken", accessToken);
    setValue(Object.assign({}, value, { accessToken }));
  };

  let signout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("Name");
    setValue(Object.assign({}, value, { accessToken: null }));
  };

  //let getAccessToken = () => {
  //return sessionStorage.getItem("accessToken");
  //};

  // let userLoggedIn = () => {
  //   const [loggedIn, setLoggedIn] = useState(false);
  //   useEffect(() => {
  //     if (getAccessToken()) {
  //       setLoggedIn(true);
  //     } else {
  //       setLoggedIn(false);
  //     }
  //   });
  // };

  let [value, setValue] = useState({
    signin,
    signout,
    accessToken: sessionStorage.getItem("accessToken"),
  });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth, AuthProvider };
