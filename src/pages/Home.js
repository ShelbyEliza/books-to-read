import { useCollection } from "../hooks/useCollection";
import BlogCard from "./blogs/BlogCard";

export default function Home() {
  const { documents: blogs } = useCollection("blogs");

  return (
    <div className="content">
      {blogs &&
        blogs.map((blog) => (
          <div key={blog.id}>
            <BlogCard blog={blog} isSingleBlog={false} />
          </div>
        ))}
    </div>
  );
}
