import Head from "next/head";
import styles from "../styles/Home.module.css";

import { useEffect, useState } from "react";
import { useAuth } from "contexts/auth";
import { useRouter } from "next/router";

export default function Home() {
  const { isAuthenticated, isLoading, user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push(`/users/${user.id}`);
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        ></meta>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}
