import Cookies from "js-cookie";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({});

const LoadingScreen = () => {
  return <div>Loading...</div>;
};

const URL = {
  LOCAL: `http://android.local.frontmono.com:8080/napi/latest/auth/user/info/current`,
  DEV: `http://develop.wetribe.io/napi/latest/auth/user/info/current`,
  PROD: `http://wetribe.us/napi/latest/auth/user/info/current`,
};

const testUser = {
  id: 14,
  nickname: "test01",
  desc: "test",
  thumb:
    "https://we-dev-harry.s3.us-west-2.amazonaws.com/dev-wetribe/cloud/user/1648626974591001.png",
};

const getUserInfo = (token) => {
  const response = fetch(`${URL.PROD}?jtoken=${token}`);
  return response.then((res) => res.json()).then((res) => res.result);
};
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(testUser);

  useEffect(() => {
    // checkSession();
  }, []);

  const checkSession = async () => {
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
  };

  const logout = async () => {
    Cookies.remove("jtoken");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, logout, checkSession }}
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
