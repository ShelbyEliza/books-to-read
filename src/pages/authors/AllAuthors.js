// styles:
import "./AllAuthors.css";

import { useCollection } from "../../hooks/useCollection";

import AuthorCard from "./AuthorCard";

export default function AllAuthors() {
  const { documents: authors } = useCollection("authors");
  // console.log(authors);
  return (
    <div>
      <h2>All Authors</h2>
      <AuthorCard authors={authors} />
    </div>
  );
}
