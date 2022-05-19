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
      return { isPending: false, document: null, success: true, error: null };
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

  let usersDocs = doc(db, "users", user.uid);
  let blogsCollection = collection(usersDocs, "blogs");
  let authorsCollection = collection(usersDocs, "authors");

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
      console.log("Should be last Message!");
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  const checkIfAuthorExists = async (blog) => {
    dispatch({ type: "IS_PENDING" });

    let q = query(authorsCollection, where("name", "==", blog.author));
    const authorDoc = await getDocs(q);
    /////////// WORKING ON THIS! //////////////////////

    console.log(authorDoc.docs[0]);

    const authorDocs = authorDoc.docs;
    console.log("hello");

    // console.log(authorDocs.docs);

    if (authorDoc.docs.length > 0) {
      console.log("author exists");

      await updateAuthor(authorDoc, blog);
    } else {
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
    // console.log(blog);

    // let q = query(blogsCollection, where("id", "==", blog.id));
    // const blogDoc = await getDocs(doc(q));
    const blogDoc = doc(blogsCollection, blog.id);
    console.log(blogDoc);
    try {
      await deleteDoc(blogDoc);

      dispatchIfNotCancelled({
        type: "DELETED_BLOG",
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
