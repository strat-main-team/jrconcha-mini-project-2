"use client";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import BreadCrumbs from "@/components/ui/breadcrumbs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  addBlogPost,
  updateBlogPost,
  getBlogPostById,
} from "@/actions/blog-post-action";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { Loader2Icon } from "lucide-react";

const BlogPostEditor: FC = () => {
  // If editing an existing post as a result of clicking the edit button on the blog page.
  const searchParams = useSearchParams();
  const isEditing = searchParams.get("editing") === "true";
  const postIdToBeEdited = searchParams.get("id");

  // Set the values of the inputs.
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

  // Handle Image and its Input State
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null); // InputFile element ref to manipulate, because cant use ImagePreviewURL as input value of Input element

  // Handles previewing of uploaded image.
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type, must be an image
      if (!file.type.startsWith("image/")) {
        toast.error("Invalid File Type", {
          description: "Only image files are allowed (JPG, PNG, etc.)",
          action: { label: "Dismiss", onClick: () => {} },
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
          setImagePreviewUrl("");
        } // Reset previewed Image used by Image element and the input element name to empty. So in case of an error, both do not linger.
        return;
      }

      // Validate File size, limit is 500kb
      const fileSizeInBytes = file.size;
      const fileSizeInKB = fileSizeInBytes / 1024;
      console.log(`File size: ${fileSizeInBytes} bytes`); // Test
      // If greater, just indicate the error to the user then return.
      if (fileSizeInKB > 500) {
        toast.error("Error!", {
          description: `Image File Size Limit is 500 KB. Your file is ${fileSizeInKB.toFixed(
            2
          )} KB`,
          action: { label: "Dismiss", onClick: () => {} },
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
          setImagePreviewUrl("");
        } 
        return;
      }
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  // Track whether the server action of blog update or creation is successful or not.
  const [serverActionIsPending, setServerActionIsPending] = useState(false);

  // This determines whether or not the formAction will be the addBlog or editBlog server action. Note the Error: Body exceeded 1 MB limit.
  const handleBlogPost = async (formData: FormData) => {
    setServerActionIsPending(true);

    let response: { success: boolean; message: string };

    if (isEditing) {
      response = await updateBlogPost(Number(postIdToBeEdited), formData);
    } else {
      response = await addBlogPost(formData);
    }

    // Display a toast depending on the status of the server action of blog post
    if (response.success) {
      toast.success("Success!", {
        description: `${response.message}`,
        action: { label: "Dismiss", onClick: () => {} },
      });
    } else if (response.message && !response.success) {
      toast.error("Error!", {
        description: `${response.message}`,
        action: { label: "Dismiss", onClick: () => {} },
      });
    }
    // Reset values so they do not linger.
    setImagePreviewUrl("");
    setTitle("");
    setDescription("");
    setContent("");
    setServerActionIsPending(false);
  };

  return (
    <div>
      <BreadCrumbs></BreadCrumbs>
      <h1 className="mt-5 text-2xl">Post Editor</h1>
      {/* Form */}
      {/* On submission, automatically calls the formAction and pass the formData to it */}
      <form action={handleBlogPost} className="mt-5">
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
            Cover Image (Accepted formats: Image — Max size: 500 KB)
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
            ref={fileInputRef}
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

          <BlogPostEditorButton
            isEditing={isEditing}
            serverActionIsPending={serverActionIsPending}
          ></BlogPostEditorButton>
        </div>
      </form>
    </div>
  );
};

interface Props {
  isEditing: boolean;
  serverActionIsPending: boolean;
}

const BlogPostEditorButton: FC<Props> = ({
  isEditing,
  serverActionIsPending,
}) => {
  return (
    <Button
      type="submit"
      disabled={serverActionIsPending}
      aria-busy={serverActionIsPending}
    >
      {serverActionIsPending ? (
        <>
          <Loader2Icon className="animate-spin mr-2" />
          Please Wait
        </>
      ) : isEditing ? (
        "Update Blog Post"
      ) : (
        "Create Blog Post"
      )}
    </Button>
  );
};
export default BlogPostEditor;
