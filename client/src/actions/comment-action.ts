"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { comments } from "@/db/schema";

// Get Methods
export const getCommentsByPostID = async (post_id: number) => {
  const data = await db
    .select()
    .from(comments)
    .where(eq(comments.post_id, post_id));
  return data;
};

// Post Methods
export const addComment = async (
  post_id: number,
  pathToRevalidate: string,
  commentText: string
) => {
  try {
    // throw new Error("Error") // Test
    await db.insert(comments).values({
      comment: commentText,
      post_id: post_id,
      created_at: new Date(),
      updated_at: new Date(),
    });
    revalidatePath(pathToRevalidate);
    return { success: true, message: "Commment added successfully." };
  } catch (e) {
    return { success: false, message: `Failed to add comment. ${e}` };
  }
};

// Put Methods
export const updateComment = async (
  comment_id: number,
  updated_comment: string,
  pathToRevalidate: string
) => {
  try {
    await db
      .update(comments)
      .set({
        comment: updated_comment,
        updated_at: new Date(),
      })
      .where(eq(comments.id, comment_id));
    revalidatePath(pathToRevalidate);
    return { success: true, message: "Commment updated successfully." };
  } catch (e) {
    return { success: false, message: `Failed to update comment. ${e}` };
  }
};

// Delete Methods
export const deleteComment = async (
  comment_id: number,
  pathToRevalidate: string
) => {
  try {
    // throw new Error("Error") // Test
    await db.delete(comments).where(eq(comments.id, comment_id));
    revalidatePath(pathToRevalidate);
    return { success: true, message: "Commment deleted successfully." };
  } catch (e) {
    return { success: false, message: `Failed to delete comment. ${e}` };
  }
};
