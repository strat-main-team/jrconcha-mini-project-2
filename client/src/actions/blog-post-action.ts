"use server";
// import { eq, not } from "drizzle-orm";
// import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { blogPost } from "@/db/schema";
// import { BlogPostDataType } from "@/types/BlogPostDataType";

export const getBlogPosts = async () => {
  const data = await db.select().from(blogPost);
  if (!data) console.log("Database is empty.");
  return data;
};

export const addBlogPost = async (formData: FormData) => {
  
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const content = formData.get("content") as string;
  const image_filename = formData.get("cover-image") as string;

  if (!title || !description || !content || !image_filename) {
    throw new Error("Missing required fields.");
  }
  try {
    await db.insert(blogPost).values({
      image_filename: "image_filename",
      created_at: new Date(),
      updated_at: new Date(),
      title: title,
      description: description,
      content: content,
    });
  } catch (e) {
    throw new Error(`Failed to create new Blog Post: ${e}`);
  }
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
