import React, { createContext, useContext, useState, useEffect } from "react";
import { validateToken } from "../utils/tokenvalidation";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [info, setInfo] = useState({});
  const [role, setRole] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      setIsCheckingAuth(true);

      try {
        const { isValid, role, info } = await validateToken();
        // console.log(isValid, role, info);
        setInfo(info);
        setIsLoggedIn(isValid);
        setRole(role);
      } catch (error) {
        console.error("Error validating token:", error);
        setIsLoggedIn(false);
        setRole(null);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, role, isCheckingAuth, info, setIsLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
