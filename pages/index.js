import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import FabButton from "../components/FabButton";
import UrlList from "../components/UrlList";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script src="https://cdn.tailwindcss.com"></Script>

      <main className={styles.main}>
        <div className="w-full text-3xl font-bold text-indigo-500 p-4 rounded-md my-8">
          Voice of Coding Videos
        </div>
        <UrlList />
      </main>
      <Link href="/add">
        <div className={styles.fabContainer}>
          <FabButton />
        </div>
      </Link>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
