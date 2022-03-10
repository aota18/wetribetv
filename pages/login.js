import styles from "../styles/Home.module.css";
import { FaKey } from "react-icons/fa";
const url = "http://develop.wetribe.io/login/oauth";
const appId = "16467379610030032b3e8323c05d808cfa218696d1ca29c7";

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
