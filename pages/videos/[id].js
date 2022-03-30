import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

const Video = () => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(getAuth());
  const { id } = router.query;
  return (
    <div>
      {id}
    </div>
  );
};

export default Video;
