"use client";
import { FC } from "react";
import { BlogPostDataType } from "@/types/BlogPostDataType";
import { monthNames } from "@/lib/utils";

interface Props {
  blogPostData: BlogPostDataType;
  newYear: boolean;
}

const formatDate = (dateObject: Date) => {
  return `${
    monthNames[dateObject.getMonth()]
  } ${dateObject.getDay()}, ${dateObject.getFullYear()}`;
};

const BlogPostItem: FC<Props> = ({ blogPostData, newYear }) => {
  if (!newYear) return null; // NewYear's value is delayed. Also, instead of null, should probably display a skeleton while waiting for newYear's value from blogPostInterface.

  return (
    <div className="w-full mt-5">
      {/* If it is a new Year, generated a header for it */}
      {newYear ? (
        <h1 className="mb-5 text-2xl font-semibold md:text-3xl xl:text-4xl">
          {blogPostData.created_at.getFullYear()}
        </h1>
      ) : (
        ""
      )}
      <h1 className="font-bold text-lg md:text-xl xl:text-2xl text-[var(--accent-primary)]">
        {" "}
        {blogPostData.title}
      </h1>
      <p
        id="blog-post-date"
        className="mt-1 text-sm md:text-base xl:text-lg  font-medium text-[var(--tone-four)]"
      >
        {blogPostData.created_at
          ? formatDate(blogPostData.created_at)
          : "Date Unknown"}
      </p>
      <p
        id="blog-post-desc"
        className="mt-1 text-sm md:text-base  lg:text-lg text-[var(--tone-four)] text-ellipsis"
      >
        {blogPostData.description}
      </p>
    </div>
  );
};

export default BlogPostItem;
