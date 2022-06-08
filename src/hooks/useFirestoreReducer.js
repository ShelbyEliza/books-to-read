import { useReducer, useEffect, useState } from "react";

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
    case "ADDED_AUTHOR":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "ADDED_KEY":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "UPDATED_BLOG":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "UPDATED_AUTHOR":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "DELETED_BLOG":
      return {
        isPending: true,
        document: null,
        success: action.payload,
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

export const useFirestoreReducer = (state, action) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return {
    response,
    dispatch,
    dispatchIfNotCancelled,
  };
};
