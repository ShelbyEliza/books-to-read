import { useState } from "react";
import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

// firebase imports:
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch({ type: "LOGIN", payload: res.user });
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
  };
  const sendVerificationEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      // email verification sent
      // redirect to temp page until email is verified
      return "Message sent! Please check your email to verify your account!";
    });
  };

  return { login, sendVerificationEmail, isPending, error };
};
