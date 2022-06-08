import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { db } from "../firebase/config";

import { useFirestoreReducer } from "./useFirestoreReducer";

// firebase imports:
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  deleteDoc,
  query,
  where,
  limit,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

export const useFirestore = () => {
  const { response, dispatch, ifStillNotCancelled } = useFirestoreReducer();
  const [isCancelled, setIsCancelled] = useState(false);

  const { user } = useAuthContext();
  const usersDoc = doc(db, "users", user.uid);
  const blogsCollection = collection(usersDoc, "blogs");
  const authorsCollection = collection(usersDoc, "authors");
  const keysCollection = collection(usersDoc, "keys");

  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      ifStillNotCancelled(action);
    }
  };

  const locateDoc = async (collection, queryRules) => {
    let q = query(collection, where(...queryRules), limit(1));
    const doc = await getDocs(q, limit(1));
    return doc;
  };

  const getDocRefOrData = async (coll, id) => {
    const docRef = doc(coll, id);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data();
    return {
      docRef,
      docData,
    };
  };

  const checkIfAuthorExists = async (blog) => {
    dispatch({ type: "IS_PENDING" });

    try {
      let isNewAuthor;
      let authorDocRef;
      let queryRules = ["name", "==", blog.author];
      const authorDoc = await locateDoc(authorsCollection, queryRules);

      // update authorDoc & return updated authorDocRef
      if (authorDoc.docs.length > 0) {
        console.log("author exists");
        isNewAuthor = false;

        const authorDocID = authorDoc.docs[0].id;
        authorDocRef = doc(authorsCollection, authorDocID);

        await updateAuthor(authorDocRef, blog);
      }
      // add authorDoc & return new authorDocRef
      else {
        console.log("author does not exist");
        isNewAuthor = true;

        authorDocRef = await addAuthor(blog);
        console.log(authorDocRef);
      }
      return { isNewAuthor, authorDocRef };
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  const checkIfKeyExists = async (blog, blogDocRef, authorDocRef) => {
    dispatch({ type: "IS_PENDING" });

    const authorDocID = authorDocRef.id;
    const { docData: authorDocData } = await getDocRefOrData(
      authorsCollection,
      authorDocID
    );

    console.log(authorDocData);

    try {
      let booksWithIDs = { [blog.title]: blogDocRef.id };

      let queryRules = ["author", "==", authorDocData.name];
      const keyDoc = await locateDoc(keysCollection, queryRules);

      if (keyDoc.docs.length > 0) {
        console.log("key exists");
        const keyDocID = keyDoc.docs[0].id;
        const keyDocRef = doc(keysCollection, keyDocID);

        await updateKey(keyDocRef, booksWithIDs);
      } else {
        console.log("key does NOT exist");
        await setKey(authorDocID, authorDocData, booksWithIDs);
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

  const setKey = async (authorDocID, authorDocData, booksWithIDs) => {
    dispatch({ type: "IS_PENDING" });

    let key = {
      author: authorDocData.name,
      authorID: authorDocID,
      aboutAuthor: authorDocData.aboutAuthor,
      booksWithIDs: [booksWithIDs],
    };
    try {
      const addedKey = await setDoc(doc(usersDoc, "keys", authorDocID), {
        ...key,
      });

      dispatchIfNotCancelled({
        type: "ADDED_KEY",
        payload: addedKey,
      });
      return addedKey;
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  const updateBlog = async (prevBlogDocRef, updatedData) => {
    try {
      const updatedBlog = await updateDoc(prevBlogDocRef, updatedData);
      dispatchIfNotCancelled({
        type: "UPDATED_BLOG",
        payload: updatedBlog,
      });
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

      dispatchIfNotCancelled({
        type: "UPDATED_AUTHOR",
        payload: updatedAuthor,
      });
      return authorDocRef;
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  const updateKey = async (keyDocRef, booksWithIDs) => {
    try {
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

  const updateData = async (updatedData) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const { isNewAuthor, authorDocRef } = await checkIfAuthorExists(
        updatedData
      );

      let prevAuthorID = updatedData.authorID;
      let updatedAuthorID = authorDocRef.id;

      const { docRef: prevBlogDocRef, docData: prevBlogDocData } =
        await getDocRefOrData(blogsCollection, updatedData.id);

      const { docData: authorDocData } = await getDocRefOrData(
        authorsCollection,
        updatedAuthorID
      );
      console.log(authorDocData);

      const { docRef: prevKeyDocRef, docData: prevKeyDocData } =
        await getDocRefOrData(keysCollection, prevAuthorID);

      let prevKeyTitle = { [prevBlogDocData.title]: prevBlogDocRef.id };
      let newKeyTitle = { [updatedData.title]: prevBlogDocRef.id };

      if (prevBlogDocData.title !== updatedData.title) {
        console.log("Book title has been changed.");

        // Condition 1: Title Changes & Author Name Changes:
        if (prevBlogDocData.author !== updatedData.author) {
          console.log("Author name has been changed.");
          changeAuthorName(
            authorDocRef,
            updatedData,
            prevBlogDocData,
            prevBlogDocRef
          );
          changeKeyData(
            prevKeyDocRef,
            prevKeyDocData,
            prevKeyTitle,
            newKeyTitle
          );
        }
        // Condition 2: Title Changes & Author Name DOES NOT Change:
        else {
          console.log("Author name has NOT been changed.");

          await updateBlog(prevBlogDocRef, updatedData);

          let updatedAuthor = await updateDoc(authorDocRef, {
            booksWritten: arrayRemove(prevBlogDocData.title),
          });
          updatedAuthor = await updateDoc(authorDocRef, {
            booksWritten: arrayUnion(updatedData.title),
          });
          dispatchIfNotCancelled({
            type: "UPDATED_AUTHOR",
            payload: updatedAuthor,
          });

          let updatedKey = await updateDoc(prevKeyDocRef, {
            booksWithIDs: arrayRemove(prevKeyTitle),
          });
          updatedKey = await updateDoc(prevKeyDocRef, {
            booksWithIDs: arrayUnion(newKeyTitle),
          });
          dispatchIfNotCancelled({
            type: "UPDATED_KEY",
            payload: updatedKey,
          });
        }
      } else {
        console.log("Book title has NOT been changed.");
        // Condition 3: Title DOES NOT Change & Author Name Changes:
        if (prevBlogDocData.author !== updatedData.author) {
          console.log("Author name has been changed.");
          console.log(`Is this new author?: ${isNewAuthor}`);
          changeAuthorName(
            authorDocRef,
            updatedData,
            prevBlogDocData,
            prevBlogDocRef,
            authorDocRef,
            authorDocData,
            isNewAuthor
          );
        }

        // Condition 4: Title DOES NOT Change & Author Name DOES NOT Change:
        else {
          console.log("Author name has NOT been changed.");

          await updateBlog(prevBlogDocRef, updatedData);
        }
      }
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  const changeKeyData = async (
    prevKeyDocRef,
    prevKeyDocData,
    prevKeyTitle,
    newKeyTitle,
    updatedData,
    updatedAuthorID,
    authorDocData
  ) => {
    // Condition 3a: is this a new author:
    let isNewAuthor = null;
    let queryRules = ["author", "==", updatedData.author];
    const existingKeyDoc = await locateDoc(keysCollection, queryRules);

    if (existingKeyDoc.docs.length > 0) {
      isNewAuthor = false;
      const { docRef: existingKeyDocRef } = getDocRefOrData(
        keysCollection,
        existingKeyDoc.docs[0].id
      );
      let updatedKey = await updateDoc(existingKeyDocRef, {
        booksWithIDs: arrayUnion(prevKeyTitle),
      });
    } else {
      isNewAuthor = true;
      let newKey = await setKey(updatedAuthorID, authorDocData, newKeyTitle);
    }
    // Condition 3b: author has written multiple books
    // delete previous key because either authorName changed or title changed
    if (prevKeyDocData.booksWithIDs.length > 1) {
      let updatedPrevKey = await updateDoc(prevKeyDocRef, {
        booksWithIDs: arrayRemove(prevKeyTitle),
      });
      dispatchIfNotCancelled({
        type: "UPDATED_KEY",
        payload: updatedPrevKey,
      });
    }
    // Condition 3b: author has only written the book being edited
    else {
      await deleteDoc(prevKeyDocRef);
    }
  };

  const changeAuthorName = async (
    authorDocRef,
    updatedData,
    prevBlogDocData,
    prevBlogDocRef,
    prevAuthorDocRef,
    prevAuthorDocData
  ) => {
    let updatedAuthorID = authorDocRef.id;

    // Condition 3a: is this a new author:
    let isNewAuthor = null;
    let queryRules = ["name", "==", updatedData.author];
    const existingAuthorDoc = await locateDoc(authorsCollection, queryRules);

    if (existingAuthorDoc.docs.length > 0) {
      console.log("hey");
      isNewAuthor = false;
      const existingAuthorDocID = existingAuthorDoc.docs[0].id;
      const existingAuthorDocRef = doc(authorsCollection, existingAuthorDocID);
      let updatedAuthor = await updateDoc(existingAuthorDocRef, {
        booksWritten: arrayUnion(prevBlogDocData.title),
      });
    }
    // else {
    //   isNewAuthor = true;
    //   let newAuthor = await setKey(updatedAuthorID, authorDocData, newKeyTitle);
    // }
    // Condition 3a: author has written multiple books
    console.log(prevAuthorDocData);
    if (prevAuthorDocData.booksWritten.length > 1) {
      let updatedPrevAuthor = await updateDoc(prevAuthorDocRef, {
        booksWritten: arrayRemove(prevBlogDocData.title),
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

    const updatedDataWithAuthorID = {
      ...updatedData,
      authorID: updatedAuthorID,
    };
    await updateBlog(prevBlogDocRef, updatedDataWithAuthorID);
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

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
    locateDoc,
    getDocRefOrData,
    checkIfAuthorExists,
    checkIfKeyExists,
    addBlog,
    addAuthor,
    setKey,
    updateData,
    updateBlog,
    updateAuthor,
    updateKey,
    deleteBlog,
    response,
  };
};
