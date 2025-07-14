export type BlogPostDataType = {
  id: number;
  image_file_path: string;
  created_at: Date;
  updated_at: Date;
  // author_id?: number | null;
  title: string;
  description: string;
  content: string;
};

export type CommentDataType = {
  id: number,
  comment: string,
  post_id: number,
  // parent_comment_id: number | null,
  created_at: Date,
  updated_at: Date,
}