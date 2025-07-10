export type BlogPostDataType = {
  id?: number;
  image_filename: string;
  created_at: Date;
  updated_at: Date;
  author_id?: number | null;
  title: string;
  description: string;
  content: string;
};
