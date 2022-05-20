// styles:
import "./AllBlogs.css";

import { useCollection } from "../../hooks/useCollection";

import BlogCard from "../home/BlogCard";
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
              <Link to="#">{blog.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
