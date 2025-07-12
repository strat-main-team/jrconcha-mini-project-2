import { notFound } from "next/navigation";
import { getBlogPostById } from "@/actions/blog-post-action";
import { getCommentsByPostID } from "@/actions/comment-action";
import BlogPostContent from "@/components/blog-post-content";
import BlogInfo from "@/components/blog-info";
import BlogComment from "@/components/blog-comment";

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const id = Number(params.slug.split("-")[0]);
  const blogResult = await getBlogPostById(id);
  const commentResult = await getCommentsByPostID(id);
  if (!blogResult.success) return notFound(); // Type Guard
  
  return (
    <section>
      <BlogInfo blogPostData={blogResult.data}></BlogInfo>
      <BlogPostContent markdown={blogResult.data.content}></BlogPostContent>
      <BlogComment post_id={blogResult.data.id} comments={commentResult}></BlogComment>
    </section>
  );
}
