import styles from "../styles/Home.module.css";
import { FaKey } from "react-icons/fa";
const url = "http://develop.wetribe.io/login/oauth";
const appId = "1646729472967002b1a95ee34a4b91ba24d4d7a0f8c41e3d";

const Login = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className="flex flex-col justify-between h-80 my-8  font-light text-gray-500 p-4 rounded-md">
          <div className="text-2xl text-black text-center">Please Sign in</div>
          <button
            className="flex items-center bg-red-500 rounded-lg shadow-md text-white py-2 px-4 text-lg font-light"
            onClick={() => {
              window.location.href = `${url}?appId=${appId}`;
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
