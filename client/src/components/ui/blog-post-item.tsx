"use client";
import { FC, useEffect, useState } from "react";
import { generateSlug, formatDate } from "@/lib/utils";
import Link from "next/link";
import { BlogPostDataType } from "@/types/BlogPostDataType";
import { Button } from "./button";

interface Props {
  blogPostData: BlogPostDataType;
  newYear: boolean;
  editMode: boolean;
  handleDelete: (id: number) => void;
  handleEdit: (id: number) => void;
}

const BlogPostItem: FC<Props> = ({
  blogPostData,
  newYear,
  editMode,
  handleDelete,
  handleEdit,
}) => {
  const [buttonsDisplayStatus, setButtonsDisplayStatus] = useState(false);

  useEffect(() => {
    if (editMode) {
      const timeout = setTimeout(() => {
        setButtonsDisplayStatus(true);
      }, 100);

      return () => clearTimeout(timeout); // Clean up on editMode toggle
    } else {
        setButtonsDisplayStatus(false);
    }
  }, [editMode]);

  if (newYear === null) return null; // NewYear's value is delayed. Also, instead of null, should probably display a skeleton while waiting for newYear's value from blogPostInterface.

  return (
    <div className={`w-full`}>
      {/* If it is a new Year, generated a header for it */}
      {newYear ? (
        <h1 className="mb-5 text-2xl font-semibold md:text-3xl xl:text-4xl group-hover:underline mt-5 px-2 ">
          {blogPostData.created_at.getFullYear()}
        </h1>
      ) : (
        ""
      )}
      <div className="group hover:bg-[var(--tone-two)] p-2 rounded-sm md:flex">
        <Link
          key={blogPostData.id}
          href={generateSlug(blogPostData.id!, blogPostData.title)}
          className="flex flex-col flex-1"
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
        <div
          className={`mt-2 gap-2 items-center transition-all duration-300 ease-in-out
              ${editMode ? "flex" : "hidden"}
              ${buttonsDisplayStatus ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <Button
            variant="outline"
            size="sm"
            className="text-xs px-2 py-1"
            onClick={() => {
              handleEdit(blogPostData.id);
            }}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="text-xs px-2 py-1"
            onClick={() => {
              handleDelete(blogPostData.id);
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogPostItem;
