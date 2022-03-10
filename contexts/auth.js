import Cookies from "js-cookie";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({});

const LoadingScreen = () => {
  return <div>Loading...</div>;
};

const baseURL = "http://develop.wetribe.io/napi/latest/auth/user/info/current";

const getUserInfo = (token) => {
  const response = fetch(`${baseURL}?jtoken=${token}`);
  return response.then((res) => res.json()).then((res) => res.result);
};
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("useeffect");
    async function loadUserFromCookies() {
      const token = Cookies.get("jtoken");
      console.log(token);
      if (token) {
        console.log("herllo");
        try {
          const result = await getUserInfo(token);

          const { code, data } = result;

          console.log(code, data);
          setUser(data);
          console.log("Got user");
        } catch (e) {
          console.log(e);
        }
      }
      setIsLoading(false);
    }

    loadUserFromCookies();
  }, []);

  const logout = async () => {
    Cookies.remove("jwt");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, isLoading, logout }}
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
