"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { blogPost } from "@/db/schema";
import { BlogPostDataType } from "@/types/DataTypes";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "@/actions/cloudinary-upload";

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

export const addBlogPost = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const content = formData.get("content") as string;
  const image_file = formData.get("cover-image") as File;

  if (!title || !description || !content || !image_file) {
    return { success: false, message: "Missing required fields." };
  }

  if (!image_file.type.startsWith("image/")) {
    return { success: false, message: "Invalid image format." };
  }

  try {
    const cloudinary_image_url = await uploadToCloudinary(
      image_file,
      image_file.name
    );
    await db.insert(blogPost).values({
      image_file_path: cloudinary_image_url,
      created_at: new Date(),
      updated_at: new Date(),
      title: title,
      description: description,
      content: content,
    });
    revalidatePath("/blog/post-editor");
    revalidatePath("/blog");
    revalidatePath("/");

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
export const updateBlogPost = async (id: number, formData: FormData) => {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;
    const image_file = formData.get("cover-image") as File;

    if (!title || !description || !content || !image_file) {
      return { success: false, message: "Missing required fields." };
    }

    if (!image_file.type.startsWith("image/")) {
      return { success: false, message: "Invalid image format." };
    }

    // Delete the old picture file from existing item.
    const postToBeUpdated = await db.query.blogPost.findFirst({
      where: eq(blogPost.id, id),
    });

    if (!postToBeUpdated) {
      return { success: false, message: "Unable to get post to be updated." };
    }

    try {
      deleteFromCloudinary(postToBeUpdated.image_file_path);
    } catch (e) {
      return {
        success: false,
        message: `Unable to delete old picture of post to be updated: ${e}`,
      };
    }

    const cloudinary_image_url = await uploadToCloudinary(
      image_file,
      image_file.name
    );

    // Update values in db
    await db
      .update(blogPost)
      .set({
        title: title,
        description: description,
        content: content,
        updated_at: new Date(),
        image_file_path: cloudinary_image_url,
      })
      .where(eq(blogPost.id, id));

    revalidatePath("/blog");
    revalidatePath("/");
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
    // Delete the old picture file from to be deleted item.
    const postToBeDeleted = await db.query.blogPost.findFirst({
      where: eq(blogPost.id, id),
    });

    if (!postToBeDeleted) {
      return { success: false, message: "Unable to get post to be updated." };
    }

    try {
      deleteFromCloudinary(postToBeDeleted.image_file_path);
    } catch (e) {
      return {
        success: false,
        message: `Unable to delete old picture of post to be updated: ${e}`,
      };
    }
    // Then delete the blog post entry
    await db.delete(blogPost).where(eq(blogPost.id, id));
    revalidatePath("/blog");
    revalidatePath("/");
    return { success: true, message: "Blog Post deleted successfully:" };
  } catch (e) {
    return { success: false, message: `Failed to delete Blog Post. ${e}` };
  }
};
