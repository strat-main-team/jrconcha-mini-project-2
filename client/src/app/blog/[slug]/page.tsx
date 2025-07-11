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
  const result = await getBlogPostById(id);
  if (!result.success) return notFound(); // Type Guard
  
  return (
    <section>
      <BlogInfo blogPostData={result.data}></BlogInfo>
      <BlogPostContent markdown={result.data.content}></BlogPostContent>
      <BlogComment></BlogComment>
    </section>
  );
}
