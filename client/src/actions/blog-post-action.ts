"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { blogPost } from "@/db/schema";
import { BlogPostDataType } from "@/types/BlogPostDataType";
import { join } from "path";
import { writeFile } from "fs/promises";
import { unlink } from "fs/promises";
import { access } from "fs/promises";
import { constants } from "fs";

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

  // Convert file to buffer
  const buffer = Buffer.from(await image_file.arrayBuffer());

  // Rename file with the timestamp prefix to avoid collisions.
  const timestamp = Date.now();
  const fileExt = image_file.name.split(".").pop();
  const filename = `${timestamp}_${image_file.name.slice(
    0,
    image_file.name.indexOf(".")
  )}.${fileExt}`;

  const filePath = join(process.cwd(), "public/uploads", filename); // EX: http://localhost:3000/uploads/1699876543210.png

  try {
    await writeFile(filePath, buffer);
    // throw new Error("Error") // Test
    await db.insert(blogPost).values({
      image_filename: filename,
      created_at: new Date(),
      updated_at: new Date(),
      title: title,
      description: description,
      content: content,
    });
    revalidatePath("/blog/post-editor");
    revalidatePath("/blog");

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

    // Get the old filePath
    const oldFilePath = join(
      process.cwd(),
      "public/uploads",
      postToBeUpdated.image_filename
    );

    try {
      await access(oldFilePath, constants.F_OK); // Check if it exists
      await unlink(oldFilePath); // Then Delete
    } catch (e) {
      return {
        success: false,
        message: `Unable to delete old picture of post to be updated: ${e}`,
      };
    }

    // Convert file to buffer
    const buffer = Buffer.from(await image_file.arrayBuffer());

    // Rename file with the timestamp prefix to avoid collisions.
    const timestamp = Date.now();
    const fileExt = image_file.name.split(".").pop();
    const filename = `${timestamp}_${image_file.name.slice(
      0,
      image_file.name.indexOf(".")
    )}.${fileExt}`;

    const filePath = join(process.cwd(), "public/uploads", filename); // EX: http://localhost:3000/uploads/1699876543210.png

    await writeFile(filePath, buffer);

    // Update values in db
    await db
      .update(blogPost)
      .set({
        title: title,
        description: description,
        content: content,
        updated_at: new Date(),
        image_filename: filename,
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
    revalidatePath("/blog");
    return { success: true, message: "Blog Post deleted successfully:" };
  } catch (e) {
    return { success: false, message: `Failed to delete Blog Post. ${e}` };
  }
};
