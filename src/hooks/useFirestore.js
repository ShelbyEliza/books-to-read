import { useReducer, useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { db } from "../firebase/config";

// firebase imports:
import {
  addDoc,
  setDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, document: null, success: false, error: null };
    case "ADDED_BLOG":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const useFirestore = (c) => {
  const { user } = useAuthContext();

  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  let ref = doc(db, c, user.uid);

  console.log(ref);

  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // add a document
  const addBlog = async (blog) => {
    dispatch({ type: "IS_PENDING" });
    console.log(blog);

    try {
      const addedBlog = await addDoc(collection(ref, "blogs"), { ...blog });

      dispatchIfNotCancelled({
        type: "ADDED_BLOG",
        payload: addedBlog,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addBlog, response };
};
