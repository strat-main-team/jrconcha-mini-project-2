"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { blogPost } from "@/db/schema";
import { BlogPostDataType } from "@/types/BlogPostDataType";

// Get Methods
export const getBlogPosts = async () => {
  const data = await db.select().from(blogPost);
  return data;
};

export const getBlogPostById = async (
  id: number
): Promise<
  | {
      success: true;
      message: string;
      data: BlogPostDataType;
    }
  | {
      success: false;
      message: string;
      data: null;
    }
> => {
  try {
    // Use the id to find the equivalent entry with the same id.
    const result = await db.query.blogPost.findFirst({
      where: eq(blogPost.id, id),
    });

    if (!result) {
      return {
        success: false,
        message: `Could not find this blog post using id: ${id}.`,
        data: null,
      };
    }

    return {
      success: true,
      message: "getBlogPostById Successful",
      data: result,
    };
  } catch (e) {
    return {
      success: false,
      message: `Could not find this blog post using id: ${id}. Error: ${e}`,
      data: null,
    };
  }
};

// Post Methods

export const addBlogPost = async (
  prevState: { success: boolean; message: string }, // Required by the useActionState, because we're returning {success, message}
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
    return {
      success: true,
      message: "Blog post created successfully.",
    };
  } catch (e) {
    return {
      success: false,
      message: `Something went wrong during creation: ${e}`,
    };
  }
};

// Put Methods
export const updateBlogPost = async (
  prevState: { success: boolean; message: string }, // Required by the useActionState, because we're returning {success, message}
  id: number,
  formData: FormData
) => {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;
    const image_filename = formData.get("cover-image") as string;

    if (!title || !description || !content || !image_filename) {
      return { success: false, message: "Missing required fields." };
    }

    await db
      .update(blogPost)
      .set({
        title: title,
        description: description,
        content: content,
        updated_at: new Date(),
        image_filename: "image_filename",
      })
      .where(eq(blogPost.id, id));

    revalidatePath("/blog");
    return {
      success: true,
      message: "Blog post updated successfully.",
    };
  } catch (e) {
    return {
      success: false,
      message: `Something went wrong during the update ${e}`,
    };
  }
};

// Delete Methods
export const deleteBlogPost = async (id: number) => {
  try {
    await db.delete(blogPost).where(eq(blogPost.id, id));
  } catch (e) {
    throw new Error(`Failed to Delete the blog Post ${e}`);
  }

  revalidatePath("/blog");
};
