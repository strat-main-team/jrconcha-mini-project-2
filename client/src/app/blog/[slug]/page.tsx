import { notFound } from "next/navigation";
import { getBlogPostById } from "@/actions/blog-post-action";
import BlogPostContent from "@/components/ui/blog-post-content";
import BlogInfo from "@/components/ui/blog-info";
import BlogComment from "@/components/ui/blog-comment";

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const id = Number(params.slug.split("-")[0]);
  const blogPost = await getBlogPostById(id);

  if (!blogPost) return notFound();

  return (
    <section>
      <BlogInfo blogPostData={blogPost}></BlogInfo>
      <BlogPostContent markdown={blogPost.content}></BlogPostContent>
      <BlogComment></BlogComment>
    </section>
  );
}
