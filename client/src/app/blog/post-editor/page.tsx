import BlogPostEditor from "@/components/blog-post-editor";
import { FC, Suspense } from "react";

const PostEditorPage: FC = () => {
  return (
    // UseSearch params must be wrapped in a suspense.
    <Suspense fallback={<div className="text-center text-sm mt-10">Loading editor...</div>}>
      <BlogPostEditor />
    </Suspense>
  );
};

export default PostEditorPage;
