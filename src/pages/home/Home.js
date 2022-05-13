// styles:
import "./Home.css";

import { useCollection } from "../../hooks/useCollection";
import BlogCard from "./BlogCard";

export default function Home() {
  const { documents: blogs, error } = useCollection("blogs");
  if (blogs) {
    console.log(blogs);
  }
  return (
    <div>
      <h1>Under the Shelf</h1>
      {blogs && <BlogCard blogs={blogs} />}
    </div>
  );
}
