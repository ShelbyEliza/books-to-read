// firebase imports:
import { db, auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

import { collection } from "firebase/firestore";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    let ref = collection(db, "users");
    console.log(ref);
    signOut(auth)
      .then(() => {
        dispatch({ type: "LOGOUT" });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return { logout };
};
