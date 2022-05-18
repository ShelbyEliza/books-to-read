import { useState, useEffect } from "react";
import { db } from "../firebase/config";

import { useAuthContext } from "./useAuthContext";

// firebase imports:
import { doc, getDocs, collection, onSnapshot } from "firebase/firestore";

export const useCollection = (c, users) => {
  const { user } = useAuthContext();
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ref = collection(db, c);
    let newRef = doc(db, users, user.uid);
    let nextRef = collection(newRef, "blogs");
    console.log(nextRef);
    // let newRef = getDocs(ref, "blogs");
    // console.log(newRef);

    const unsub = onSnapshot(
      nextRef,
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        // update state
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("Could not fetch the data.");
      }
    );

    // unsubscribe on unmount
    return () => unsub();
  }, [c]);

  return { documents, error };
};
