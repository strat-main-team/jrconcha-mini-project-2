"use server";
import { eq, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { blogPost } from "@/db/schema";
import { BlogPostDataType } from "@/types/BlogPostDataType";
// import { BlogPostDataType } from "@/types/BlogPostDataType";

export const getBlogPosts = async () => {
  const data = await db.select().from(blogPost);
  if (!data) console.log("Database is empty.");
  return data;
};

export const getBlogPostById = async (id: number) => {
  try {
    // Use the id to find the equivalent entry with the same id.
    const result = await db.query.blogPost.findFirst({
      where: eq(blogPost.id, id),
    });

    return result;
  } catch (e) {
    return {
      error: `Could not find this blog post using id: ${id}. Error: ${e}`,
    };
  }
};

export async function generateMetadata({ params }) {
  const id = Number(params.slug.split("-")[0]);
  const blogPost = await getBlogPostById(id) as BlogPostDataType;
  

  if (blogPost) {
    return {
      title: blogPost.title,
      description: blogPost.description,
    };
  }
}

export const addBlogPost = async (
  prevState: { success: boolean; message: string },
  formData: FormData
) => {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const content = formData.get("content") as string;
  const image_filename = formData.get("cover-image") as string;

  if (!title || !description || !content || !image_filename) {
    return { success: false, message: "Missing required fields." };
  }
  try {
    // throw new Error("Error") // Test
    await db.insert(blogPost).values({
      image_filename: "image_filename",
      created_at: new Date(),
      updated_at: new Date(),
      title: title,
      description: description,
      content: content,
    });
    revalidatePath("/blog/post-editor");
    return { success: true, message: "Post created successfully!" };
  } catch (e) {
    return { success: false, message: `Something went wrong: ${e}` };
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
