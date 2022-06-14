// styles & assets:
import { useParams } from "react-router-dom";

import { useDocument } from "../../hooks/useDocument";
import AuthorCard from "./AuthorCard";

export default function AuthorDetails() {
  const { id } = useParams();
  const { document: author, error } = useDocument("authors", id);
  const { document: key } = useDocument("keys", id);

  return (
    <div className="author-details content">
      {author && <AuthorCard author={author} keyInfo={key} />}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
