"use client";
import { FC, useState, useEffect } from "react";
import { BlogPostDataType } from "@/types/BlogPostDataType";
import BlogPostItem from "./ui/blog-post-item";
import Link from "next/link";

interface Props {
  blogPosts: BlogPostDataType[];
}

const BlogPostsList: FC<Props> = ({ blogPosts }) => {
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

  return (
    <main>
      <div className="flex justify-between items-end px-2">
        <h1 className="font-bold text-4xl md:text-5xl xl:text-5xl 3xl:text-6xl">
          {" "}
          Blog
        </h1>
        <Link
          href="blog/post-editor/"
          className="text-xs text-[var(--link-color)] hover:text-[var(--link-hover)] underline underline-offset-1px lg:text-sm xl:text-base"
        >
          {" "}
          Add a new post{" "}
        </Link>
      </div>
      <p className="mt-5 font-normal md:text-lg lg:text-xl px-2">
        {" "}
        A humble software engineer&apos;s compilation of reflections,
        experiments, and lessons from his journey through the tech world.{" "}
      </p>

      <div className="w-full flex flex-col mt-8">
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

export default BlogPostsList;
