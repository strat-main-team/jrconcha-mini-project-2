"use server";
// import { eq, not } from "drizzle-orm";
// import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { blogPost } from "@/db/schema";
import { BlogPostDataType } from "@/types/BlogPostDataType";

export const getBlogPosts = async () => {
  const data = await db.select().from(blogPost);
  if (!data) console.log("Database is empty.");
  return data;
};

export const addBlogPost = async ({ ...props }: BlogPostDataType) => {
  await db.insert(blogPost).values({
    image_filename: props.image_filename,
    created_at: props.created_at,
    updated_at: props.updated_at,
    // author_id: props.author_id,
    title: props.title,
    description: props.description,
    content: props.content,
  });
};

// export const deleteBlogPost = async (id: number) => {
//   await db.delete(blogPost).where(eq(blogPost.id, id));

//   revalidatePath("/");
// };

// export const toggleBlogPost = async (id: number) => {
//   await db
//     .update(blogPost)
//     .set({
//       done: not(blogPost.done),
//     })
//     .where(eq(blogPost.id, id));

//   revalidatePath("/");
// };

// export const editBlogPost = async (id: number, text: string) => {
//   await db
//     .update(blogPost)
//     .set({
//       text: text,
//     })
//     .where(eq(blogPost.id, id));

//   revalidatePath("/");
// };
