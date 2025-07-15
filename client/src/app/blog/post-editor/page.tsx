import BlogPostEditor from "@/components/blog-post-editor";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Post Editor",
  description: "Create, edit, and delete your blog posts all in one place.",
  openGraph: {
    title: "Blog Post Editor",
    description:
      "Create, edit, and delete your blog posts all in one place.",
    type: "website",
    url: `https://jrconcha-mini-project-2.vercel.app/blog/post-editor`,
    images: [
      {
        url: `https://jrconcha-mini-project-2.vercel.app/post_editor_page_metadata.png`,
        alt: `Image of the post-editor page`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
       title: "Blog Post Editor",
    description:
      "Create, edit, and delete your blog posts all in one place.",
    images: [
      `https://jrconcha-mini-project-2.vercel.app/post_editor_page_metadata.png`,
    ],
  },
};

export default async function PostEditorPage() {
  return (
    // UseSearch params must be wrapped in a suspense.
    <Suspense
      fallback={
        <div className="text-center text-sm mt-10">Loading editor...</div>
      }
    >
      <BlogPostEditor />
    </Suspense>
  );
};

