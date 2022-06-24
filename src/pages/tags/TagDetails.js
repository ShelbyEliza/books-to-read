import { Link } from "react-router-dom";

import { useCollection } from "../../hooks/useCollection";

export default function TagDetails({ tag }) {
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
          (blogsWithTag.length > 0 ? (
            blogsWithTag.map((blog) => (
              <Link key={blog.id} to={`/blogDetails/${blog.id}`}>
                <h2>{blog.title}</h2>
              </Link>
            ))
          ) : (
            <div>
              <h3>No blogs with this tag found.</h3>
            </div>
          ))}
      </div>
    </div>
  );
}
