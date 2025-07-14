"use client";
import { FC, useState, useEffect } from "react";
import { BlogPostDataType } from "@/types/BlogPostDataType";
import BlogPostItem from "./ui/blog-post-item";
import Link from "next/link";
import { Button } from "./ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Toggle } from "@/components/ui/toggle";
import { deleteBlogPost, getBlogPostById } from "@/actions/blog-post-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  blogPosts: BlogPostDataType[];
}

const BlogPostsList: FC<Props> = ({ blogPosts }) => {
  const [sortedBlogPosts, setSortedBlogPosts] = useState<
    Array<BlogPostDataType>
  >([]);

  // Handle the event where the delete button is clicked
  const handleDelete = (id: number) => {
    getBlogPostById(id).then(async (result) => {
      if (result.data) {
        const response = await deleteBlogPost(id);
        if (response.success) {
          toast.success("Success!", {
            description: `${response.message} ${result.data.title}`,
            action: { label: "Dismiss", onClick: () => {} },
          });
        } else if (response.message && !response.success) {
          toast.error("Error!", {
            description: `${response.message} ${result.data.title}`,
            action: { label: "Dismiss", onClick: () => {} },
          });
        }
      }
    });
  };

  // Handle the event where the edit button is clicked
  const router = useRouter();
  const handleEdit = (id: number) => {
    router.push(`/blog/post-editor?editing=true&id=${id}`);
  };

  // Track state of editMode, which decides if to show the buttons for edit and delete or not.
  const [editMode, setEditMode] = useState(false);

  // Find which blog posts are the first of its year.
  const [firstBlogPosts, setFirstBlogPosts] = useState<BlogPostDataType[]>([]);

  // Run whenever blogPosts change, so the latest blogPosts are displayed.
  useEffect(() => {
    if (!blogPosts.length) return;

    // Sort by date descending, oldest post first.
    const sortedBlogPosts = [...blogPosts].sort((a, b) => {
      return b.created_at.getTime() - a.created_at.getTime();
    });

    // Update blog posts to be displayed
    setSortedBlogPosts(sortedBlogPosts);

    const seenYears = new Set<number>();
    const firstPostsByYear: Array<BlogPostDataType> = [];
    // If we haven't seen this year yet, add it to seen year, and push the blogpost to firstpostsbyyear.
    for (const blogPost of sortedBlogPosts) {
      const year = blogPost.created_at.getFullYear();
      if (!seenYears.has(year)) {
        seenYears.add(year);
        firstPostsByYear.push(blogPost);
      }
    }

    setFirstBlogPosts(firstPostsByYear);
  }, [blogPosts]);

  return (
    <main>
      <div className="flex justify-between items-end">
        <h1 className="font-bold text-4xl md:text-5xl xl:text-5xl 3xl:text-6xl">
          {" "}
          Blog
        </h1>
        <div className="flex gap-2 items-center">
          <Link
            href="blog/post-editor/"
            className="text-xs text-[var(--link-color)] hover:text-[var(--link-hover)] underline underline-offset-1px lg:text-sm xl:text-base"
          >
            <Button
              variant="outline"
              size="icon"
              className="active:bg-accent lg:p-5"
            >
              <FontAwesomeIcon
                className="text-[var(--tone-seven)] text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
                icon={faPenToSquare}
              ></FontAwesomeIcon>
            </Button>
          </Link>
          <Toggle
            aria-label="Toggle italic"
            pressed={editMode}
            onPressedChange={() => setEditMode((prev) => !prev)} // Toggle edit and delete buttons visibility.
            className="py-4 lg:py-5 border-1 border-[var(--tone-four)] w-[70px]"
          >
            {editMode ? "Editing" : "Viewing"}
          </Toggle>
        </div>
      </div>
      <p className="mt-5 font-normal text-[var(--tone-six)] md:text-lg lg:text-xl">
        {" "}
        A humble software engineer&apos;s compilation of reflections,
        experiments, and lessons from his journey through the tech world.{" "}
      </p>

      {blogPosts.length > 0 ? (
        <div className="w-full flex flex-col mt-8">
          {/* For each blog post in DB, create a blog post item */}
          {sortedBlogPosts.map((blogPost) => (
            <BlogPostItem
              newYear={firstBlogPosts.includes(blogPost)} // Return newYear is true if this is the first blog post of the year.
              key={blogPost.id}
              blogPostData={blogPost}
              editMode={editMode}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))}
        </div>
      ) : (
        <p className="text-base text-[var(--tone-five)] text-center mt-10 font-semibold">
          {" "}
          😞 No Posts Yet...
        </p>
      )}
    </main>
  );
};

export default BlogPostsList;
