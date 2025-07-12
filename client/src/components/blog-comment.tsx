"use client";
import { CommentDataType } from "@/types/BlogPostDataType";
import { FC, Fragment, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { addComment } from "@/actions/blog-post-action";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";

interface Props {
  comments: CommentDataType[];
  post_id: number;
}

const BlogComment: FC<Props> = ({ comments, post_id }) => {
  console.log(comments); // >> TEST <<
  return (
    <section className="mt-10">
      <h1 className="text-2xl font-semibold">Comments</h1>
      <hr className="mt-2 mb-2"></hr>
      {comments.length === 0 ? (
        <div className="flex flex-col gap-2 mt-5">
          <p className="text-base font-medium text-center">No comments yet.</p>
          <p className="text-sm text-[var(--tone-five)] text-center">
            Start the conversation.
          </p>
        </div>
      ) : (
        <Comments comments={comments}></Comments>
      )}

      <CommentContentArea post_id={post_id}></CommentContentArea>
    </section>
  );
};

export default BlogComment;

const Comments: FC<{ comments: Array<CommentDataType> }> = ({ comments }) => {
  return (
    <div className="flex flex-col gap-y-3 mt-5">
      {comments.map((comment) => {
        return <Comment key={comment.id} commentData={comment}></Comment>;
      })}
    </div>
  );
};

const Comment: FC<{ commentData: CommentDataType }> = ({ commentData }) => {
  const [content, setContent] = useState(commentData.comment);

  return (
    <div className="rounded-xl border p-4 bg-[var(--tone-two)] shadow-sm">
      <div className="flex items-start gap-3">
        {/* Placeholder avatar */}
        <div className="w-10 h-10 rounded-full bg-[var(--tone-three)] flex-shrink-0" />

        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-sm">{"Anonymous"}</h4>
            <span className="text-xs text-[var(--tone-six)]">
              {commentData.created_at
                ? commentData.created_at.toLocaleString()
                : "Just now"}
            </span>
          </div>
          <p className="mt-1 text-sm text-[var(--tone-six)]">{content}</p>
        </div>
      </div>
    </div>
  );
};

const CommentContentArea: FC<{ post_id: number }> = ({ post_id }) => {
  const [textComment, setTextComment] = useState("");
  const [path, setPath] = useState("");
  const fullPathName = usePathname();
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setPath(fullPathName);
  }, [fullPathName]);

  const handleSubmit = async () => {
    setPending(true);
    const response = await addComment(post_id, path, textComment);
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
    setPending(false);

    // console.log(post_id , path, textComment); // TEST
  };

  return (
    <div className="mt-4 flex flex-col">
      <p className="text-lg text-[var(--tone-six)] my-2">
        {" "}
        Join the discussion
      </p>
      <textarea
        onChange={(e) => setTextComment(e.target.value)}
        value={textComment}
        rows={5}
        className="bg-White border resize-none border-Light-gray py-2 px-5 rounded-md placeholder:text-start text-Grayish-Blue "
        placeholder="Add a comment..."
        required
      />
      <div className="flex justify-end my-4">
        <Button onClick={handleSubmit} disabled={pending}>
          {pending ? (
            <Fragment>
              <Loader2Icon className="animate-spin mr-2" />
              Please Wait
            </Fragment>
          ) : (
            "Post Comment"
          )}
        </Button>
      </div>
    </div>
  );
};
