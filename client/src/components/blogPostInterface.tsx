"use client";
import { FC, useState, useEffect } from "react";
// import AddTodo from "./addTodo";
import { addBlogPost } from "@/actions/blogPostAction";
import { BlogPostDataType } from "@/types/BlogPostDataType";
import BlogPostItem from "./ui/blog-post-item";

interface Props {
  blogPosts: BlogPostDataType[];
}

const BlogPostInterface: FC<Props> = ({ blogPosts }) => {
  // Find which blog posts are the first of its year.
  const [firstBlogPosts, setFirstBlogPosts] = useState<BlogPostDataType[]>([]);
  useEffect(() => {
    if (!blogPosts.length) return;

    // Sort by date ascending
    const sortedBlogPosts = [...blogPosts].sort((a, b) => {
      return a.created_at.getTime() - b.created_at.getTime();
    });

    const seenYears = new Set<number>();
    const firstPostsByYear: Array<BlogPostDataType> = [];
    // If we haven't seen this year yet, add it to seen year, and push the blogpost to firstpostsbyyear.
    for (const blogPost of sortedBlogPosts) {
      const year = blogPost.created_at.getFullYear();
      if (!seenYears.has(year)) {
        seenYears.add(year);
        firstPostsByYear.push(blogPost);
      }
    }

    setFirstBlogPosts(firstPostsByYear);
  }, [blogPosts]);

  // Function that creates a new Blog Post. Other details (id) are generated serverside.
  const createBlogPost = (
    title: string,
    description: string,
    content: string,
    image_filename: string,
    created_at: Date,
    updated_at: Date
  ) => {
    addBlogPost({
      title,
      description,
      content,
      image_filename,
      created_at,
      updated_at,
    });
  };

  return (
    <main>
      <div className="w-full flex flex-col mt-8 gap-2">
        {/* For each blog post in DB, create a blog post item */}
        {blogPosts.map((blogPost) => (
          <BlogPostItem
            newYear={firstBlogPosts.includes(blogPost)} // Return newYear is true if this is the first blog post of the year.
            key={blogPost.id}
            blogPostData={blogPost}
          />
        ))}
      </div>
    </main>
  );
};

export default BlogPostInterface;
