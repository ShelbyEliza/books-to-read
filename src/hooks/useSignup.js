import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { auth, db } from "../firebase/config";

// firebase imports:
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        updateProfile(res.user, { displayName }).then(() => {
          let ref = doc(db, "users", res.user.uid);
          setDoc(ref, { displayName });
        });
        return res;
      })
      .then((res) => {
        setIsPending(false);
        if (auth.currentUser !== null) {
        }
        dispatch({ type: "LOGIN", payload: res.user });
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return { signup, error, isPending };
};
