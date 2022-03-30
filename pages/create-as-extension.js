import { useAuth } from "contexts/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";

const CreateAsExtension = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const { extVersionId, domain } = router.query;

  const wetribeURL = `http://develop.wetribe.io/extension/tools/create`;
  const appURL = user ? `https://wetribetv.vercel.app/users/${user.id}` : "";

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);

  const onClickContinue = () => {
    window.location.href = `${wetribeURL}?appURL=${appURL}&extVersionId=${extVersionId}&domain=${domain}`;
  };

  return (
    <div className={styles.main}>
      <div className="w-full text-center text-3xl font-bold text-black p-4 rounded-md my-8">
        Create as Extension
      </div>
      <div className="flex flex-col">
        This is sample page for creation of Wetribe extension using Extension
        Tool.
        <div className="my-8 text-center text-indigo-500 text-xl p-2">
          {appURL}
        </div>
        <button
          onClick={() => onClickContinue()}
          className="my-2 w-full border border-indigo-500 p-3 text-lg rounded-md bg-indigo-500 text-white"
        >
          Continue on Wetribe
        </button>
      </div>
    </div>
  );
};

export default CreateAsExtension;

// Query Param should be
// extId : Extension Tool ID
// domain : Extension Domain
