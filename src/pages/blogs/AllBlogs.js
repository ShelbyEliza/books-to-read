// styles:
import "./AllBlogs.css";

import { useCollection } from "../../hooks/useCollection";

import BlogCard from "../home/BlogCard";

export default function AllBlogs() {
  const { documents: blogs } = useCollection("users", "blogs");

  return <div>{blogs && <BlogCard blogs={blogs} />}</div>;
}
