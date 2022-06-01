// // firebase imports:
// import { doc, getDocs, getDoc, query, where, limit } from "firebase/firestore";

// import { useFirestore } from "./useFirestore";

// export default function useCheck(usersDoc, authorsCollection, keysCollection) {
//   const {
//     updateAuthor,
//     addAuthor,
//     updateKey,
//     addKey,
//     dispatch,
//     dispatchIfNotCancelled,
//   } = useFirestore();

//   const checkIfAuthorExists = async (blog) => {
//     let q = query(
//       authorsCollection,
//       where("name", "==", blog.author),
//       limit(1)
//     );
//     const authorDoc = await getDocs(q, limit(1));

//     if (authorDoc.docs.length > 0) {
//       console.log("author exists");

//       const authorDocID = authorDoc.docs[0].id;
//       const authorDocRef = doc(authorsCollection, authorDocID);

//       await updateAuthor(authorDocRef, blog);
//       return authorDocRef;
//     } else {
//       console.log("author does not exist");

//       const authorDocRef = await addAuthor(blog);
//       return authorDocRef;
//     }
//   };

//   const checkIfKeyExists = async (blogDocRef, authorDocRef) => {
//     dispatch({ type: "IS_PENDING" });

//     console.log(blogDocRef, authorDocRef);

//     const blogDocSnap = await getDoc(blogDocRef);
//     const blogDocData = blogDocSnap.data();

//     const authorDocSnap = await getDoc(authorDocRef);
//     const authorDocData = authorDocSnap.data();

//     try {
//       let booksWithIDs = { [blogDocData.title]: blogDocRef.id };

//       let q = query(
//         keysCollection,
//         where("author", "==", blogDocData.author),
//         limit(1)
//       );
//       const keyDoc = await getDocs(q, limit(1));

//       if (keyDoc.docs.length > 0) {
//         console.log("key exists");

//         await updateKey(keyDoc, booksWithIDs);
//       } else {
//         console.log("key does NOT exist");
//         await addKey(blogDocData, authorDocData, booksWithIDs);
//       }
//     } catch (err) {
//       dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
//     }
//   };

//   return checkIfKeyExists, checkIfAuthorExists;
// }
