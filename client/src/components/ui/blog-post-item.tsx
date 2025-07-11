"use client";
import { FC } from "react";
import { BlogPostDataType } from "@/types/BlogPostDataType";
import { generateSlug, formatDate } from "@/lib/utils";
import Link from "next/link";

interface Props {
  blogPostData: BlogPostDataType;
  newYear: boolean;
}

const BlogPostItem: FC<Props> = ({ blogPostData, newYear }) => {
  if (newYear === null) return null; // NewYear's value is delayed. Also, instead of null, should probably display a skeleton while waiting for newYear's value from blogPostInterface.

  return (
    <div className="w-full">
      {/* If it is a new Year, generated a header for it */}
      {newYear ? (
        <h1 className="mb-5 text-2xl font-semibold md:text-3xl xl:text-4xl group-hover:underline mt-5 px-2 ">
          {blogPostData.created_at.getFullYear()}
        </h1>
      ) : (
        ""
      )}
      <div className="group hover:bg-[var(--tone-two)] p-2 rounded-sm">
        <Link
          key={blogPostData.id}
          href={generateSlug(blogPostData.id!, blogPostData.title)}
        >
          <h1 className="font-bold text-lg md:text-xl 3xl:text-2xl text-[var(--accent-primary)] group-hover:underline">
            {" "}
            {blogPostData.title}
          </h1>
          <p
            id="blog-post-date"
            className="mt-1 text-sm md:text-base 3xl:text-lg font-medium text-[var(--tone-five)]"
          >
            {blogPostData.created_at
              ? formatDate(blogPostData.created_at)
              : "Date Unknown"}
          </p>
          <p
            id="blog-post-desc"
            className="mt-1 text-sm md:text-base 3xl:text-lg text-[var(--tone-six)] text-ellipsis"
          >
            {blogPostData.description}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default BlogPostItem;
