import { notFound } from "next/navigation";
import { getBlogPostById } from "@/actions/blog-post-action";
import { getCommentsByPostID } from "@/actions/comment-action";
import BlogPostContent from "@/components/blog-post-content";
import BlogInfo from "@/components/blog-info";
import BlogCommentBlock from "@/components/blog-comment";
import { Metadata } from "next";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
 const { slug }: {slug: string} = await params; // https://stackoverflow.com/questions/79124951/type-error-in-next-js-route-type-params-id-string-does-not-satis
  const id = Number(slug.split("-")[0]);
  const blogPost = await getBlogPostById(id);

  if (!blogPost.success) return {};

  const post = blogPost.data;

  return {
    title: `Blog #${id}: ${post.title}`,
    description: post.description,
    openGraph: {
      title: `Blog #${id}: ${post.title}`,
      description: post.description,
      type: "article",
      url: `https://jrconcha-mini-project-2.vercel.app/blog/${slug}`,
      images: [
        {
          url: post.image_file_path,
          alt: `Blog #${id}: ${post.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Blog #${id}: ${post.title}`,
      description: post.description,
      images: [post.image_file_path],
    },
  };
}

export default async function BlogPostPage({ params }: {params: Params}) {
const { slug }: {slug: string} = await params; // https://stackoverflow.com/questions/79124951/type-error-in-next-js-route-type-params-id-string-does-not-satis
  const id = Number(slug.split("-")[0]);
  const blogResult = await getBlogPostById(id);
  const commentResult = await getCommentsByPostID(id);
  if (!blogResult.success) return notFound(); // Type Guard

  return (
    <section>
      <BlogInfo blogPostData={blogResult.data}></BlogInfo>
      <BlogPostContent markdown={blogResult.data.content}></BlogPostContent>
      <BlogCommentBlock
        post_id={blogResult.data.id}
        comments={commentResult}
      ></BlogCommentBlock>
    </section>
  );
}
