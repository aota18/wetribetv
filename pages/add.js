import { useAuth } from "contexts/auth";
import { Router, useRouter } from "next/router";
import React, { useEffect } from "react";
import AddUrl from "../components/AddUrl";
import styles from "../styles/Home.module.css";

const Add = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className="w-full my-8 text-3xl font-light text-gray-500 p-4 rounded-md">
          Add your new video URL 🎬
        </div>
        <AddUrl user={user} />
      </main>
    </div>
  );
};

export default Add;
