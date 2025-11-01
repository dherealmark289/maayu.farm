import { fetchBlogPosts } from "../../lib/fetchData";
import BlogClient from "../ui/BlogClient";

export default async function BlogPage() {
  // Fetch data at build time for static generation
  const posts = await fetchBlogPosts();

  return <BlogClient initialPosts={posts} />;
}

