import styles from "../styles/Home.module.css";
import { FaKey } from "react-icons/fa";
import Image from "next/image";
import LogoImg from "../public/logo.png";

const URL = {
  LOCAL: `http://android.local.frontmono.com:8080/login/oauth`,
  DEV: `http://develop.wetribe.io/login/oauth`,
  PROD: `https://wetribe.us/login/oauth`,
};

const url = "http://develop.wetribe.io/login/oauth";
const appId = "164863312037900282181457df21a92b411baf2837e18524";

const Login = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className="flex flex-col justify-between h-80 my-8  font-light text-gray-500 p-4 rounded-md">
          <div className="">
            <div className="text-2xl font-extrabold text-black ">Login</div>
            <div className="text-md font-bold text-gray-400">
              Please Sign in to continue.
            </div>
            <div className="flex flex-col justify-center items-center my-8">
              <Image className="" src={LogoImg} width={160} height={160} />
            </div>
          </div>
          <button
            className="flex items-center bg-black shadow-md text-white py-2 px-4 text-lg font-light"
            onClick={() => {
              window.location.href = `${URL.PROD}?appId=${appId}`;
            }}
          >
            <FaKey className="mr-4" />
            Sign in with Wetribe
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
