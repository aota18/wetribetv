import { Router, useRouter } from "next/router";
import Cookies from "js-cookie";
import { useEffect } from "react";

const Callback = ({ jtoken }) => {
  const router = useRouter();
  useEffect(() => {
    console.log(jtoken);
    Cookies.set("jtoken", jtoken);

    router.push("/");
  }, []);
  return <div>Callback page</div>;
};

Callback.getInitialProps = async ({ query }) => {
  const { jtoken } = query;
  return { jtoken };
};

export default Callback;
