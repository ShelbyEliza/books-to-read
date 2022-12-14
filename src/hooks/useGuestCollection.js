import { useState, useEffect, useRef } from "react";
import { db } from "../firebase/config";

// firebase imports:
import { doc, collection, query, where, onSnapshot } from "firebase/firestore";

export const useGuestCollection = (coll, _q) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  const q = useRef(_q).current;

  useEffect(() => {
    let ref;
    ref = doc(db, "guest", "RQVY1nVh57EBlYN6K0hN");
    ref = collection(ref, coll);

    if (q) {
      ref = query(ref, where(...q));
    }

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
  }, [coll, q]);

  return { documents, error };
};
