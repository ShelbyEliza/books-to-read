import { useParams, Link } from "react-router-dom";

import { useCollection } from "../../hooks/useCollection";

export default function TagDetails() {
  const { tag } = useParams();

  const { documents: blogsWithTag } = useCollection("blogs", [
    "tags",
    "array-contains",
    tag,
  ]);

  return (
    <div>
      <h1>{tag} Blogs</h1>
      <div>
        {blogsWithTag &&
          blogsWithTag.map((blog) => (
            <Link key={blog.id} to={`/blogDetails/${blog.id}`}>
              <h2>{blog.title}</h2>
            </Link>
          ))}
      </div>
    </div>
  );
}
