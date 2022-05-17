import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { auth } from "../firebase/config";

// firebase imports:
import { collection } from "firebase/firestore";
import { signOut } from "firebase/auth";

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch, user } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    // sign the user out
    try {
      // before signout - update online status
      // only the user can update their own info while logged in
      const { uid } = user;
      await collection("users").doc(uid).update({ online: false });

      await signOut(auth);

      // dispatch logout action
      dispatch({ type: "LOGOUT" });

      // update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { logout, error, isPending };
};
