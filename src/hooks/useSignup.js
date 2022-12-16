import { useState } from "react";
import { auth, db } from "../firebase/config";
// import { useAuthContext } from "./useAuthContext";
// import { useLogout } from "./useLogout";

// firebase imports:
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  sendEmailVerification,
} from "firebase/auth";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  // const { dispatch } = useAuthContext();
  // const { logout: logoutHook } = useLogout();

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);
    const createUser = async () => {
      console.log("1. CreatingUser");
      return await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        displayName
      );
    };
    const updateUserProfile = async (userCredential) => {
      console.log("2. UpdatingUser");
      updateProfile(userCredential.user, displayName);
    };

    const updateUserDoc = async (userCredential) => {
      console.log("4. UpdatingUserDoc");
      let ref = doc(db, "users", userCredential.user.uid);
      await setDoc(ref, displayName);
    };
    const sendUserEmail = async () => {
      console.log("5. SendingUserEmail");
      setIsPending(false);
      await sendEmailVerification(auth.currentUser);
      console.log("Email verification sent!");
    };
    const signUserOut = async () => {
      if (auth.currentUser !== null) {
        console.log("6. SigningUserOut");
        console.log(auth.currentUser);
        signOut(auth);
      }
    };

    // await createUser()
    // await updateUserProfile()
    // await updateUserDoc()
    // await sendUserEmail()
    // await signUserOut()

    let userCredential = await createUser().then(() => {
      console.log("1. CreatingUser");
    });
    await updateUserProfile(userCredential);
    await updateUserDoc(userCredential);
    await sendUserEmail();
    await signUserOut();
  };

  return { signup, error, isPending };
};
