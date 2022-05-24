// styles:
import "./AllBlogs.css";

import { useCollection } from "../../hooks/useCollection";

// import BlogCard from "../home/BlogCard";
import { Link } from "react-router-dom";

export default function AllBlogs() {
  const { documents: blogs } = useCollection("blogs");

  return (
    <div>
      {/* {blogs && <BlogCard blogs={blogs} />} */}
      {blogs && (
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id}>
              <Link className="title" to={`/blogDetails/${blog.id}`}>
                <h1 className="title">{blog.title}</h1>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
