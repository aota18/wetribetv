import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Alert } from "../components/Alert";
import { Nav } from "../components/Nav";
import styles from "../styles/Home.module.css";
import "../styles/globals.css";

import { AuthProvider, ProtectRoute } from "contexts/auth";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

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

      <div className={styles.container}>
        <Nav />
        <Alert />
        <AuthProvider>
          <ProtectRoute>
            <Component {...pageProps} />
          </ProtectRoute>
        </AuthProvider>
      </div>
    </>
  );
}

export default MyApp;
