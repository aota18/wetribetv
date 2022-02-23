import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Alert } from "../components/Alert";
import { Nav } from "../components/Nav";
import { userService } from "../services/user.service";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);

  // useEffect(() => {
  //   // on initial load - run auth check
  //   authCheck(router.asPath);

  //   // on route change start - hide page content by setting authorized to false
  //   const hideContent = () => setAuthorized(false);
  //   router.events.on("routeChangeStart", hideContent);

  //   // on route change complete - run auth check
  //   router.events.on("routeChangeComplete", authCheck);

  //   // unsubscribe from events in useEffect return function
  //   return () => {
  //     router.events.off("routeChangeStart", hideContent);
  //     router.events.off("routeChangeComplete", authCheck);
  //   };
  // }, []);

  // const authCheck = (url) => {
  //   // redirect to login page if accessing a private page and not logged in
  //   setUser(userService.userValue);
  //   const publicPaths = ["/account/login", "/account/register"];
  //   const path = url.split("?")[0];
  //   if (!userService.userValue && !publicPaths.includes(path)) {
  //     setAuthorized(false);
  //     router.push({
  //       pathname: "/account/login",
  //       query: { returnUrl: router.asPath },
  //     });
  //   } else {
  //     setAuthorized(true);
  //   }
  // };
  return (
    <>
      <Head>
        <title>Next.js 11 - User Registration and Login Example</title>

        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link
          href="//netdna.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </Head>

      <div className={`app-container ${user ? "bg-light" : ""}`}>
        <Nav />
        <Alert />
        {true && <Component {...pageProps} />}
      </div>
    </>
  );
}

export default MyApp;
