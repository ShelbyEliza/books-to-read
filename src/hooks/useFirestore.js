import { useReducer, useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { db } from "../firebase/config";

// firebase imports:
import {
  addDoc,
  updateDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
  arrayUnion,
  deleteDoc,
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
    case "ADDED_AUTHOR":
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

export const useFirestore = () => {
  const { user } = useAuthContext();

  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const usersDoc = doc(db, "users", user.uid);
  const blogsCollection = collection(usersDoc, "blogs");
  const authorsCollection = collection(usersDoc, "authors");

  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // add a document
  const addBlog = async (blog) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const addedBlog = await addDoc(blogsCollection, {
        ...blog,
      });

      dispatchIfNotCancelled({
        type: "ADDED_BLOG",
        payload: addedBlog,
      });

      await checkIfAuthorExists(blog);
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  const checkIfAuthorExists = async (blog) => {
    dispatch({ type: "IS_PENDING" });

    let q = query(authorsCollection, where("name", "==", blog.author));
    const authorDocs = await getDocs(q);

    let authorDocID;
    if (authorDocs.docs.length > 0) {
      console.log("author exists");
      authorDocs.forEach((doc) => {
        authorDocID = doc.id;
      });

      const authorDoc = doc(authorsCollection, authorDocID);

      await updateAuthor(authorDoc, blog);
    } else {
      console.log("author does not exist");
      await addAuthor(blog);
    }
  };

  const addAuthor = async (blog) => {
    let author = {
      name: blog.author,
      aboutAuthor: "",
      booksWritten: [blog.title],
    };

    try {
      const addedAuthor = await addDoc(authorsCollection, { ...author });

      dispatchIfNotCancelled({
        type: "ADDED_AUTHOR",
        payload: addedAuthor,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  const updateAuthor = async (authorDoc, blog) => {
    try {
      const updatedAuthor = await updateDoc(
        authorDoc,
        { booksWritten: arrayUnion(blog.title) },
        { merge: true }
      );

      dispatchIfNotCancelled({
        type: "UPDATED_AUTHOR",
        payload: updatedAuthor,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  const deleteBlog = async (blog) => {
    dispatch({ type: "IS_PENDING" });
    console.log(response);
    const blogDoc = doc(blogsCollection, blog.id);

    try {
      await deleteDoc(blogDoc);

      dispatchIfNotCancelled({
        type: "DELETED_BLOG",
        payload: true,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addBlog, addAuthor, deleteBlog, response };
};
