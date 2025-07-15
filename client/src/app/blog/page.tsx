import { FC } from "react";
import { getBlogPosts } from "@/actions/blog-post-action";
import BlogPostsList from "@/components/blog-posts-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Lists Page",
  description:
    "Explore all my blog posts—from deep dives into code to casual developer thoughts. Browse freely, discover insights, and enjoy the journey.",
  openGraph: {
    title: "Blog Lists Page",
    description:
      "Explore all my blog posts—from deep dives into code to casual developer thoughts. Browse freely, discover insights, and enjoy the journey.",
    type: "website",
    url: `https://jrconcha-mini-project-2.vercel.app/blog`,
    images: [
      {
        url: `https://jrconcha-mini-project-2.vercel.app/blog_page_metadata.png`,
        alt: `Image of the blog lists page`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog Lists Page",
    description:
      "Explore all my blog posts—from deep dives into code to casual developer thoughts. Browse freely, discover insights, and enjoy the journey.",
    images: [
      `https://jrconcha-mini-project-2.vercel.app/blog_page_metadata.png`,
    ],
  },
};

export default async function BlogPage() {
  const data = await getBlogPosts();
  return (
    <div>
      <BlogPostsList blogPosts={data}></BlogPostsList>
    </div>
  );
};

