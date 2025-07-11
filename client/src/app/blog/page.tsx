import { FC } from "react";
import { getBlogPosts } from "@/actions/blog-post-action";
import BlogPostsList from "@/components/blog-posts-list";

const BlogPage: FC = async () => {
  const data = await getBlogPosts();
  return (
    <div>
      <BlogPostsList blogPosts={data}></BlogPostsList>
    </div>
  );
};

export default BlogPage;
