import { FC } from "react";
import { getBlogPosts } from "@/actions/blog-post-action";
import BlogPostsList from "@/components/blog-posts-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Lists Page",
  description:
    "Explore all my blog posts—from deep dives into code to casual developer thoughts. Browse freely, discover insights, and enjoy the journey.",
};

const BlogPage: FC = async () => {
  const data = await getBlogPosts();
  return (
    <div>
      <BlogPostsList blogPosts={data}></BlogPostsList>
    </div>
  );
};

export default BlogPage;
