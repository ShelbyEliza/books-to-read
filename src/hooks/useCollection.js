import { useState, useEffect } from "react";
import { db } from "../firebase/config";

import { useAuthContext } from "./useAuthContext";

// firebase imports:
import { doc, collection, onSnapshot } from "firebase/firestore";

export const useCollection = (
  firstCollection,
  secondCollection,
  thirdCollection
) => {
  const { user } = useAuthContext();
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ref = doc(db, firstCollection, user.uid);
    ref = collection(ref, secondCollection);

    const unsub = onSnapshot(
      ref,
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
  }, [firstCollection, secondCollection, user.uid]);

  return { documents, error };
};
