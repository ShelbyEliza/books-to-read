import { useReducer, useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { db } from "../firebase/config";

// firebase imports:
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  deleteDoc,
  query,
  where,
  limit,
  arrayRemove,
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

export const useFirestore = () => {
  const { user } = useAuthContext();

  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const usersDoc = doc(db, "users", user.uid);
  const blogsCollection = collection(usersDoc, "blogs");
  const authorsCollection = collection(usersDoc, "authors");
  const keysCollection = collection(usersDoc, "keys");

  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  const checkIfAuthorExists = async (blog) => {
    let q = query(
      authorsCollection,
      where("name", "==", blog.author),
      limit(1)
    );
    const authorDoc = await getDocs(q, limit(1));

    if (authorDoc.docs.length > 0) {
      console.log("author exists");

      const authorDocID = authorDoc.docs[0].id;
      const authorDocRef = doc(authorsCollection, authorDocID);

      await updateAuthor(authorDocRef, blog);
      return authorDocRef;
    } else {
      console.log("author does not exist");

      const authorDocRef = await addAuthor(blog);
      return authorDocRef;
    }
  };

  const checkIfKeyExists = async (blogDocRef, authorDocRef) => {
    dispatch({ type: "IS_PENDING" });

    console.log(blogDocRef, authorDocRef);

    const blogDocSnap = await getDoc(blogDocRef);
    const blogDocData = blogDocSnap.data();

    const authorDocSnap = await getDoc(authorDocRef);
    const authorDocData = authorDocSnap.data();

    try {
      let booksWithIDs = { [blogDocData.title]: blogDocRef.id };

      let q = query(
        keysCollection,
        where("author", "==", blogDocData.author),
        limit(1)
      );
      const keyDoc = await getDocs(q, limit(1));

      if (keyDoc.docs.length > 0) {
        console.log("key exists");

        await updateKey(keyDoc, booksWithIDs);
      } else {
        console.log("key does NOT exist");
        await addKey(blogDocData, authorDocData, booksWithIDs);
      }
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  // add a document
  const addBlog = async (blog) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const addedBlog = await addDoc(blogsCollection, {
        ...blog,
      });
      console.log(addedBlog);

      dispatchIfNotCancelled({
        type: "ADDED_BLOG",
        payload: addedBlog,
      });
      return addedBlog;
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  const addAuthor = async (blog) => {
    dispatch({ type: "IS_PENDING" });

    let author = {
      name: blog.author,
      aboutAuthor: "",
      booksWritten: [blog.title],
      booksWithIDs: [],
    };

    try {
      const addedAuthor = await addDoc(authorsCollection, { ...author });

      dispatchIfNotCancelled({
        type: "ADDED_AUTHOR",
        payload: addedAuthor,
      });
      return addedAuthor;
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  const addKey = async (blogDocData, authorDocData, booksWithIDs) => {
    dispatch({ type: "IS_PENDING" });

    let key = {
      author: blogDocData.author,
      authorID: blogDocData.authorID,
      aboutAuthor: authorDocData.aboutAuthor,
      booksWithIDs: [booksWithIDs],
    };
    try {
      console.log(key);
      const addedKey = await setDoc(
        doc(usersDoc, "keys", blogDocData.authorID),
        {
          ...key,
        }
      );

      dispatchIfNotCancelled({
        type: "ADDED_KEY",
        payload: addedKey,
      });
      return addedKey;
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  const updateKey = async (keyDoc, booksWithIDs) => {
    try {
      const keyDocID = keyDoc.docs[0].id;
      const keyDocRef = doc(keysCollection, keyDocID);

      const updatedKey = await updateDoc(
        keyDocRef,
        { booksWithIDs: arrayUnion(booksWithIDs) },
        { merge: true }
      );

      dispatchIfNotCancelled({
        type: "UPDATED_KEY",
        payload: updatedKey,
      });
      return keyDocRef;
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  const updateAuthor = async (authorDocRef, blog) => {
    try {
      const updatedAuthor = await updateDoc(
        authorDocRef,
        { booksWritten: arrayUnion(blog.title) },
        { merge: true }
      );
      // console.log(updatedAuthor);

      dispatchIfNotCancelled({
        type: "UPDATED_AUTHOR",
        payload: updatedAuthor,
      });
      return authorDocRef;
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  const updateBlog = async (updatedData) => {
    try {
      /**
       * checkIfAuthorExists retrieves the authorDoc if author exists
       * else it returns a freshly made authorDoc
       */
      const authorDocRef = await checkIfAuthorExists(updatedData);

      const blogDocRef = doc(blogsCollection, updatedData.id);
      const blogDocSnap = await getDoc(blogDocRef);
      const blogDocData = blogDocSnap.data();

      if (blogDocData.title !== updatedData.title) {
        console.log("Book title has been changed.");

        // Condition 1: Title Changes & Author Name Changes:
        if (blogDocData.author !== updatedData.author) {
          console.log("Author name has been changed.");
          changeAuthorName(authorDocRef, updatedData, blogDocData, blogDocRef);
        }
        // Condition 2: Title Changes & Author Name DOES NOT Change:
        else {
          console.log("Author name has NOT been changed.");

          const updatedBlog = await updateDoc(blogDocRef, updatedData);
          dispatchIfNotCancelled({
            type: "UPDATED_BLOG",
            payload: updatedBlog,
          });

          let updatedAuthor = await updateDoc(authorDocRef, {
            booksWritten: arrayRemove(blogDocData.title),
          });
          updatedAuthor = await updateDoc(authorDocRef, {
            booksWritten: arrayUnion(updatedData.title),
          });
          dispatchIfNotCancelled({
            type: "UPDATED_AUTHOR",
            payload: updatedAuthor,
          });
        }
      } else {
        console.log("Book title has NOT been changed.");
        // Condition 3: Title DOES NOT Change & Author Name Changes:
        if (blogDocData.author !== updatedData.author) {
          console.log("Author name has been changed.");
          changeAuthorName(authorDocRef, updatedData, blogDocData, blogDocRef);
        }
        // Condition 4: Title DOES NOT Change & Author Name DOES NOT Change:
        else {
          console.log("Author name has NOT been changed.");
          const updatedBlog = await updateDoc(blogDocRef, updatedData);
          dispatchIfNotCancelled({
            type: "UPDATED_BLOG",
            payload: updatedBlog,
          });
        }
      }
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  const changeAuthorName = async (
    authorDocRef,
    updatedData,
    blogDocData,
    blogDocRef
  ) => {
    let updatedAuthorID = authorDocRef.id;

    const prevAuthorDocRef = doc(authorsCollection, updatedData.authorID);
    const prevAuthorDocSnap = await getDoc(prevAuthorDocRef);
    const prevAuthorDocData = prevAuthorDocSnap.data();

    // Condition 3a: author has written multiple books
    if (prevAuthorDocData.booksWritten.length > 1) {
      let updatedPrevAuthor = await updateDoc(prevAuthorDocRef, {
        booksWritten: arrayRemove(blogDocData.title),
      });
      dispatchIfNotCancelled({
        type: "UPDATED_AUTHOR",
        payload: updatedPrevAuthor,
      });
    }
    // Condition 3b: author has only written the book being edited
    else {
      await deleteDoc(prevAuthorDocRef);
    }

    // give blog doc new authorID:
    const updatedBlog = await updateDoc(blogDocRef, {
      ...updatedData,
      authorID: updatedAuthorID,
    });
    dispatchIfNotCancelled({
      type: "UPDATED_BLOG",
      payload: updatedBlog,
    });
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

  return {
    checkIfAuthorExists,
    checkIfKeyExists,
    addBlog,
    addAuthor,
    updateBlog,
    deleteBlog,
    response,
  };
};
