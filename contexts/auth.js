import Cookies from "js-cookie";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({});

const LoadingScreen = () => {
  return <div>Loading...</div>;
};

const baseURL =
  "http://android.local.frontmono.com:8080//napi/latest/auth/user/info/current";

const getUserInfo = (token) => {
  const response = fetch(`${baseURL}?jtoken=${token}`);
  return response.then((res) => res.json()).then((res) => res.result);
};
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    setIsLoading(true);
    const token = Cookies.get("jtoken");

    if (token) {
      try {
        const result = await getUserInfo(token);
        console.log(result);
        const { code, data } = result;

        setUser(data);
      } catch (e) {
        console.log(e);
      }
    }
    setIsLoading(false);
  };

  const logout = async () => {
    Cookies.remove("jtoken");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, isLoading, logout, checkSession }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export const ProtectRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return children;
};
