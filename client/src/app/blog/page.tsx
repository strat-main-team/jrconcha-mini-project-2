import { FC } from "react";
import { getBlogPosts } from "@/actions/blog-post-action";
import BlogPostContent from "@/components/blog-post-content";

const BlogPage: FC = async () => {
  const data = await getBlogPosts();
  return (
    <div>
      <BlogPostContent blogPosts={data}></BlogPostContent>
    </div>
  );
};

export default BlogPage;
