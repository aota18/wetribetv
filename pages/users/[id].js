import { useRouter } from "next/router";
import FabButton from "../../components/FabButton";
import UrlList from "../../components/UrlList";
import styles from "../../styles/Home.module.css";
import Link from "../../components/Link";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { useState } from "react";
import { useAuth } from "contexts/auth";

const UserVideo = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log("===ID===", id);

  const { isAuthenticated, isLoading, user, logout } = useAuth();

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const loginUrl = "http://develop.wetribe.io/login/oauth";

  const appId = "1646729472967002b1a95ee34a4b91ba24d4d7a0f8c41e3d";
  const avatarImgUrl =
    "https://api-private.atlassian.com/users/8f525203adb5093c5954b43a5b6420c2/avatar";

  const onToggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const onClickLogout = async () => {
    logout();
  };
  const onClickLogin = () => {
    window.location.href = `${loginUrl}?appId=${appId}`;
  };

  const shareWithWetribe = () => {
    console.log("share with wetribe");
  };

  return (
    <div>
      <nav className="absolute p-2">
        <button onClick={() => onToggleNavbar()}>
          <AiOutlineMenu className="w-6 h-6" />
        </button>
      </nav>

      <div
        className={`absolute left-0 w-60 shadow-md bg-white z-10 h-full transition-opacity ease-in-out duration-300  ${
          isNavbarOpen ? " opacity-100 visible" : " opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col h-full justify-between px-4 py-2">
          <div>
            <div className="flex justify-end ">
              <button onClick={() => onToggleNavbar()}>
                <AiOutlineClose className="w-8 h-8" />
              </button>
            </div>

            <div className="flex flex-col my-4">
              <div className="flex flex-col items-center">
                <img
                  src={
                    user
                      ? user.thumb
                        ? user.thumb
                        : avatarImgUrl
                      : avatarImgUrl
                  }
                  className="w-16 rounded-full"
                />

                <span className="text-gray-700 text-sm mt-2">
                  {user ? user.nickname : "Please Login"}
                </span>
              </div>
            </div>

            <div className="border border-b border-gray-50 my-2"></div>
            <div className="flex flex-col justify-center items-center my-4">
              <span className="text-black text-sm mb-2">Share with</span>

              <div className="flex my-1">
                <div
                  onClick={() => shareWithWetribe()}
                  className="flex flex-col items-center cursor-pointer"
                >
                  <div className="rounded-full p-2 shadow-md bg-red-500">
                    <AiOutlineShareAlt className="text-white" />
                  </div>
                  <span className="text-xs text-gray-600">Wetribe</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mb-8">
            {isAuthenticated ? (
              <button
                onClick={() => onClickLogout()}
                className="px-4 py-2 w-full border shadow-sm rounded-sm "
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => onClickLogin()}
                className="px-4 py-2 w-full border shadow-sm rounded-sm "
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>

      <main className={styles.main}>
        <div className="w-full text-center text-3xl text-black p-4 rounded-md my-8">
          Search your Videos
        </div>
        <UrlList userId={id} />
      </main>

      <Link href="/add">
        <div className={styles.fabContainer}>
          <FabButton />
        </div>
      </Link>
    </div>
  );
};

export default UserVideo;
