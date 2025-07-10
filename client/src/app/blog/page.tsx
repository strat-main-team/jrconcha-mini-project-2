import { FC } from "react";
import { getBlogPosts } from "@/actions/blogPostAction";
import BlogPostInterface from "@/components/blogPostInterface";

const Blog: FC = async () => {
  const data = await getBlogPosts();
  return (
    <div>
      <h1 className="font-bold text-4xl md:text-5xl xl:text-6xl"> Blog</h1>
      <p className="mt-5 font-normal md:text-lg lg:text-xl">
        {" "}
        A humble software engineer&apos;s compilation of reflections,
        experiments, and lessons from his journey through the tech world.{" "}
      </p>
      <BlogPostInterface blogPosts={data}></BlogPostInterface>
    </div>
  );
};

export default Blog;
