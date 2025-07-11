"use client";
import { ChangeEvent, FC, useEffect, useState } from "react";
import BreadCrumbs from "@/components/ui/breadcrumbs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  addBlogPost,
  editBlogPost,
  getBlogPostById,
} from "@/actions/blog-post-action";
import Link from "next/link";
import Image from "next/image";
import BlogPostEditorButton from "./ui/blog-post-editor-button";
import { useActionState } from "react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

const BlogPostEditor: FC = () => {
  // If editing an existing post as a result of clicking the edit button on the blog page.
  const searchParams = useSearchParams();
  const isEditing = searchParams.get("editing") === "true";
  const postIdToBeEdited = searchParams.get("id");

  useEffect(() => {
    if (isEditing && postIdToBeEdited) {
      getBlogPostById(Number(postIdToBeEdited)).then((result) => {
        if (result.data) {
          setTitle(result.data.title);
          setDescription(result.data.description);
          setContent(result.data.content);
        }
      });
    }
  }, [isEditing, postIdToBeEdited]);

  // Track state of the input values
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  // This determines whether or not the formAction will be the addBlog or editBlog server action.
  const handleBlogPost = async (
    prevState: { success: boolean; message: string },
    formData: FormData
  ) => {

    if (isEditing) {
      return await editBlogPost(
        initialState,
        Number(postIdToBeEdited),
        formData
      );
    } else {
      return await addBlogPost(initialState, formData);
    }
  };

  // Track whether the server action of blog update or creation is successful or not.
  const initialState = { success: false, message: "" };

  const [state, formAction] = useActionState(handleBlogPost, initialState);

  // Display a toast depending on the status of the server action of blog post
  useEffect(() => {
    if (state.success) {
      toast.success("Success!", {
        description: `${state.message}`,
        action: { label: "Dismiss", onClick: () => {} },
      });
      setImagePreviewUrl(""); // Reset imagepreviewurl so it doesnt linger
    } else if (state.message && !state.success) {
      toast.error("Error!", {
        description: `${state.message}`,
        action: { label: "Dismiss", onClick: () => {} },
      });
      setImagePreviewUrl(""); // Reset imagepreviewurl so it doesnt linger
    }
  }, [state]);

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
      {/* Form */}
      {/* On submission, automatically calls the formAction and pass the formData to it */}
      <form action={formAction} className="mt-5">
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
              <span className="text-[var(--link-color)] hover:text-[var(--link-hover)] underline underline-offset-1 text-sm">
                Markdown
              </span>
            </Link>
            ) <span className="text-[var(--error)]">*</span>
          </label>
          <Textarea
            className="mb-1 text-ellipsis h-[300px]"
            name="content"
            id="content"
            placeholder="# CommonMark-Style Markdown Here."
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></Textarea>

          <BlogPostEditorButton isEditing={isEditing}></BlogPostEditorButton>
        </div>
      </form>
    </div>
  );
};

export default BlogPostEditor;
