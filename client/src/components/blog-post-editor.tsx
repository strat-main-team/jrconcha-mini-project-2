"use client";
import { ChangeEvent, FC, useState } from "react";
import BreadCrumbs from "@/components/ui/breadcrumbs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addBlogPost } from "@/actions/blog-post-action";
import Link from "next/link";
import Image from "next/image";
import AddBlogPostButton from "./ui/add-blog-post-button";

const BlogPostEditor: FC = () => {
  // Handle Image State
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  // Handles previewing of uploaded image.
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <BreadCrumbs></BreadCrumbs>
      <h1 className="mt-5 text-2xl">Post Editor</h1>
      <form action={addBlogPost} className="mt-5">
        <div className="flex flex-col gap-y-3">
          <label className="font-medium" htmlFor="title">
            Title <span className="text-[var(--error)]">*</span>
          </label>
          <Input
            className="mb-1"
            type="text"
            name="title"
            id="title"
            placeholder="Agentic AI's Imminency"
            required
          ></Input>

          <label className="font-medium" htmlFor="description">
            Description <span className="text-[var(--error)]">*</span>
          </label>
          <Textarea
            className="mb-1 text-ellipsis h-[150px] max-h-[300px]"
            name="description"
            id="description"
            placeholder="An investigation into Agentic AI in the modern era."
            required
          ></Textarea>
          <label className="font-medium" htmlFor="cover-image">
            Cover Image (JPG, PNG, etc.)
            <span className="text-[var(--error)]"> *</span>
          </label>
          <Input
            className="mb-1"
            accept="image/*"
            type="file"
            name="cover-image"
            id="cover-image"
            required
            multiple={false}
            onChange={handleFileChange}
          ></Input>
          <div className="flex w-full h-[200px] relative rounded-sm bg-[var(--tone-two)] justify-center items-center">
            {imagePreviewUrl ? (
              <Image
                className="object-cover rounded-sm"
                fill={true}
                id="cover-image-display"
                src={imagePreviewUrl}
                alt="A preview of the uploaded image to serve as the cover page."
              ></Image>
            ) : (
              <h1 className="text-xs font-base text-[var(--tone-four)]">
                {" "}
                Your image will be previewed here.
              </h1>
            )}
          </div>
          <label className="font-medium" htmlFor="content">
            Content (
            <Link
              href="https://commonmark.org/"
              referrerPolicy="no-referrer"
              target="_blank"
            >
              <span>Markdown</span>
            </Link>
            ) <span className="text-[var(--error)]">*</span>
          </label>
          <Textarea
            className="mb-1 text-ellipsis h-[300px]"
            name="content"
            id="content"
            placeholder="# Common Mark Style Markdown Here"
            required
          ></Textarea>

          {/* <ForwardRefEditor className="mt-10" markdown="Hello"></ForwardRefEditor> */}
          <AddBlogPostButton></AddBlogPostButton>
        </div>
      </form>
    </div>
  );
};

export default BlogPostEditor;
