import React, { useContext } from "react";

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
    sessionStorage.removeItem("Name");
  };

  let getAccessToken = () => {
    return sessionStorage.getItem("accessToken");
  };

  let value = { signin, signout, getAccessToken };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth, AuthProvider };
