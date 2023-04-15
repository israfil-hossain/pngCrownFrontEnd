import { API } from "@/config/axiosConfig";
import { AuthContext } from "./AuthContext";

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

// export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const [isAuth, setIsAuth] = useState(false);

  useEffect(()=>{
    isAuthenticated();
  })
  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  };
  console.log("Current user ", currentUser);
  const signin = (values) => {
    return API.post("/login", values);
  };

  const logout = () => {
    API.delete("/logout")
      .then((response) => {
        localStorage.removeItem("token");
        toast.success("Logout Successfully!");
        return window.location.replace("/login");
      })
      .catch((err) => {
        toast.error("Something is Wrong,");
        console.log("Err => ", err);
      });
  };

  const addUser = (values) => {
    return API.post("/users/adduser", values);
  };

  const value = {
    isAuth,
    currentUser,
    setCurrentUser,
    signin,
    logout,
    addUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
