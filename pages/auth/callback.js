import { Router, useRouter } from "next/router";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useAuth } from "contexts/auth";

const Callback = ({ jtoken, redirectUrl }) => {
  const router = useRouter();
  const { isAuthenticated, user, logout, checkSession } = useAuth();

  useEffect(() => {
    Cookies.set("jtoken", jtoken);

    checkSession();
    if (isAuthenticated) {
      if (redirectUrl) {
        router.push(redirectUrl);
      } else {
        router.push(`/users/${user.id}`);
      }
    }
  }, [isAuthenticated]);
  return <div>Callback page</div>;
};

Callback.getInitialProps = async ({ query }) => {
  const { jtoken, redirectUrl } = query;
  return { jtoken, redirectUrl };
};

export default Callback;
