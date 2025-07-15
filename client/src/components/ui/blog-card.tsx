"use client";
import { FC } from "react";
import Image from "next/image";
import { BlogPostDataType } from "@/types/BlogPostDataType";
import { format } from "date-fns";
import Link from "next/link";
import { generateBlogPostSlug } from "@/lib/utils";

interface Props {
  post: BlogPostDataType;
}

const BlogCard: FC<Props> = ({ post }) => {
  return (
    <Link href={generateBlogPostSlug(post.id!, post.title)}>
      <div className="w-full max-w-sm h-[350px] flex flex-col rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-[#111] border border-muted transition hover:shadow-xl hover:scale-105">  
        {/* Image section */}
        <div className="relative w-full h-48">
          <Image
            src={post.image_file_path}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content section */}
        <div className="p-4">
          <h2 className="text-lg font-semibold text-foreground line-clamp-2 mb-1">
            {post.title}
          </h2>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
            {post.description}
          </p>

          <div className="text-xs text-muted-foreground flex items-center justify-between">
            <span>
              by <span className="font-medium">Jhack</span>
            </span>
            <span>{format(new Date(post.created_at), "MMM dd, yyyy")}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
