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

  const updateAuthor = async (authorDocRef, blog, removeBook) => {
    try {
      if (removeBook) {
        console.log("removing previous title from authorData");
        const updatedAuthor = await updateDoc(authorDocRef, {
          booksWritten: arrayRemove(blog.title),
        });

        dispatchIfNotCancelled({
          type: "UPDATED_AUTHOR",
          payload: updatedAuthor,
        });
        return authorDocRef;
      } else {
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
      }
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  const updateKey = async (keyDocRef, booksWithIDs, removeBook) => {
    try {
      if (removeBook) {
        const updatedKey = await updateDoc(keyDocRef, {
          booksWithIDs: arrayRemove(booksWithIDs),
        });

        dispatchIfNotCancelled({
          type: "UPDATED_KEY",
          payload: updatedKey,
        });
        return keyDocRef;
      } else {
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
      }
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  const updateAboutAuthor = async (aboutAuthor, authorID) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const { docRef: authorDocRef } = await getDocRefOrData(
        authorsCollection,
        authorID
      );
      const { docRef: keyDocRef } = await getDocRefOrData(
        keysCollection,
        authorID
      );

      const updatedAuthorData = await updateDoc(authorDocRef, {
        aboutAuthor: aboutAuthor,
      });
      await updateDoc(keyDocRef, { aboutAuthor: aboutAuthor });

      dispatchIfNotCancelled({
        type: "UPDATED_ABOUT_AUTHOR",
        payload: updatedAuthorData,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  const updateData = async (updatedData) => {
    dispatch({ type: "IS_PENDING" });

    try {
      // blogID does not change, we can get the prevBlogData:
      const { docRef: prevBlogDocRef, docData: prevBlogDocData } =
        await getDocRefOrData(blogsCollection, updatedData.id);

      const { docRef: prevAuthorDocRef, docData: prevAuthorDocData } =
        await getDocRefOrData(authorsCollection, prevBlogDocData.authorID);

      // determines whether title or author name have changed on update:
      let didTitleChange = prevBlogDocData.title !== updatedData.title;
      let didAuthorChange = prevBlogDocData.author !== updatedData.author;
      let isMultiBookAuthor = prevAuthorDocData.booksWritten.length > 1;

      /** determines if author being updated is:
       * new => returns newly made authorDocRef
       * existing => returns updated existing authorDocRef
       */
      const { isNewAuthor, authorDocRef } = await checkIfAuthorExists(
        updatedData
      );
      let prevAuthorID = updatedData.authorID;
      let updatedAuthorID = authorDocRef.id;

      const { docRef: prevKeyDocRef } = await getDocRefOrData(
        keysCollection,
        prevAuthorID
      );

      let prevKeyTitle = { [prevBlogDocData.title]: prevBlogDocRef.id };
      let newKeyTitle = { [updatedData.title]: prevBlogDocRef.id };

      if (didAuthorChange === true) {
        console.log("Author name has been changed.");
        updatedData = { ...updatedData, authorID: updatedAuthorID };
        await updateBlog(prevBlogDocRef, updatedData);
        if (isNewAuthor) {
          console.log("Author is a new author.");
          const { docData: authorDocData } = await getDocRefOrData(
            authorsCollection,
            updatedAuthorID
          );

          await setKey(updatedAuthorID, authorDocData, newKeyTitle);
          // updatedData = { ...updatedData, authorID: updatedAuthorID };
          // await updateBlog(prevBlogDocRef, updatedData);

          if (isMultiBookAuthor) {
            console.log("Previous author has written multiple books.");
            let removeBook = true;
            await updateAuthor(prevAuthorDocRef, prevBlogDocData, removeBook);
            await updateKey(prevKeyDocRef, prevKeyTitle, removeBook);
          } else {
            console.log("Previous author only wrote one book.");
            await deleteDoc(prevAuthorDocRef);
            await deleteDoc(prevKeyDocRef);
          }
        } else {
          console.log("Author is an existing author.");
          const { docRef: existingKeyDocRef } = await getDocRefOrData(
            keysCollection,
            updatedAuthorID
          );
          // add option to merge aboutAuthor info
          await updateKey(existingKeyDocRef, newKeyTitle);

          if (isMultiBookAuthor) {
            console.log("Previous author has written multiple books.");
            let removeBook = true;
            await updateAuthor(prevAuthorDocRef, prevBlogDocData, removeBook);
            await updateKey(prevKeyDocRef, prevKeyTitle, removeBook);
          } else {
            console.log("Previous author only wrote one book.");
            await deleteDoc(prevAuthorDocRef);
            await deleteDoc(prevKeyDocRef);
          }
        }
      } else {
        console.log("Author name has NOT been changed.");
        await updateBlog(prevBlogDocRef, updatedData);
        if (didTitleChange === true) {
          console.log("Book title has been changed.");
          let removeBook = true;

          await updateAuthor(authorDocRef, prevBlogDocData, removeBook);
          await updateKey(prevKeyDocRef, prevKeyTitle, removeBook);
          await updateKey(prevKeyDocRef, newKeyTitle);
        } else {
          console.log("Book Title has NOT been changed.");
        }
      }
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  const deleteBlog = async (blog) => {
    dispatch({ type: "IS_PENDING" });
    const blogDoc = doc(blogsCollection, blog.id);
    const { docRef: keyDocRef, docData: keyDocData } = await getDocRefOrData(
      keysCollection,
      blog.authorID
    );
    const { docRef: authorDocRef, docData: authorDocData } =
      await getDocRefOrData(authorsCollection, blog.authorID);

    try {
      let removeBook = true;
      if (authorDocData.booksWritten.length > 1) {
        await updateAuthor(authorDocRef, blog, removeBook);
      } else {
        await deleteDoc(authorDocRef);
      }
      if (keyDocData.booksWithIDs.length > 1) {
        let idTitleKey = { [blog.title]: blog.id };
        await updateKey(keyDocRef, idTitleKey, removeBook);
      } else {
        await deleteDoc(keyDocRef);
      }

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
    updateAboutAuthor,
    updateBlog,
    updateAuthor,
    updateKey,
    deleteBlog,
    response,
  };
};
