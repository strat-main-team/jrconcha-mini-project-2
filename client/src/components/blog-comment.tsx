"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CommentDataType } from "@/types/DataTypes";
import { FC, Fragment, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import {
  addComment,
  deleteComment,
  updateComment,
  updateCommentLikes,
} from "@/actions/comment-action";
import { toast } from "sonner";
import { Loader2Icon, ThumbsUpIcon } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { getRelativeTimeWithExactTooltip } from "@/lib/utils";
import Image from "next/image";

interface Props {
  comments: CommentDataType[];
  post_id: number;
}

const BlogCommentBlock: FC<Props> = ({ comments, post_id }) => {
  const [isAlreadyEditing, setIsAlreadyEditing] = useState(false);
  const [path, setPath] = useState("");
  const fullPathName = usePathname();

  useEffect(() => {
    setPath(fullPathName);
  }, [fullPathName]);

  console.log(comments); // >> TEST <<
  return (
    <section className="mt-10">
      <h1 className=" text-3xl lg:text-4xl 3xl-text-6xl font-semibold">
        Comments
      </h1>
      <hr className="mt-2 mb-2 border-t border-[var(--tone-four)]"></hr>
      {comments.length === 0 ? (
        <div className="flex flex-col gap-2 mt-5">
          <p className="text-base font-medium text-center">No comments yet.</p>
          <p className="text-sm text-[var(--tone-five)] text-center">
            Start the conversation.
          </p>
        </div>
      ) : (
        <Comments
          comments={comments}
          path={path}
          isAlreadyEditing={isAlreadyEditing}
          updateIsAlreadyEditing={setIsAlreadyEditing}
        ></Comments>
      )}

      <CommentContentArea post_id={post_id} path={path}></CommentContentArea>
    </section>
  );
};

export default BlogCommentBlock;

const Comments: FC<{
  comments: Array<CommentDataType>;
  path: string;
  isAlreadyEditing: boolean;
  updateIsAlreadyEditing: (bool: boolean) => void;
}> = ({ comments, path, isAlreadyEditing, updateIsAlreadyEditing }) => {
  return (
    <div className="flex flex-col gap-y-3 mt-5">
      {comments.map((comment) => {
        return (
          <Comment
            key={comment.id}
            commentData={comment}
            path={path}
            isAlreadyEditing={isAlreadyEditing}
            updateIsAlreadyEditing={updateIsAlreadyEditing}
          ></Comment>
        );
      })}
    </div>
  );
};

const Comment: FC<{
  commentData: CommentDataType;
  path: string;
  isAlreadyEditing: boolean;
  updateIsAlreadyEditing: (bool: boolean) => void;
}> = ({ commentData, path, isAlreadyEditing, updateIsAlreadyEditing }) => {
  const { relative: createdAt_relative, full: createdAt_full } =
    getRelativeTimeWithExactTooltip(commentData.created_at);
  const { relative: updatedAt_relative, full: updatedAt_full } =
    getRelativeTimeWithExactTooltip(commentData.updated_at);

  const [comment_id] = useState(commentData.id);
  const [serverActionIsPending, setServerActionIsPending] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // handle when cancel button is clicked while editing.
  const handleCancelEdit = () => {
    setIsEditing(false);
    updateIsAlreadyEditing(false);
  };

  // handle clicks on the edit button on dropdown
  const handleEditClick = () => {
    if (isAlreadyEditing)
      toast("Cannot edit comment.", {
        description:
          "Already editing a comment. Please finish editing the current comment.",
      });
    else {
      setIsEditing(true);
      updateIsAlreadyEditing(true);
    }
  };

  // handle the updating of the comment
  const handleUpdate = async (updatedComment: string) => {
    setServerActionIsPending(true);
    if (updatedComment === "") {
      toast.error("Error!", {
        description: `Comment must not be empty`,
        action: { label: "Dismiss", onClick: () => {} },
      });
      setServerActionIsPending(false);
      return;
    }
    const response = await updateComment(comment_id, updatedComment, path);
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
    setIsEditing(false);
    updateIsAlreadyEditing(false);
    setServerActionIsPending(false);
  };

  // handle the deleting of the comment
  const handleDelete = async () => {
    setServerActionIsPending(true);
    const response = await deleteComment(comment_id, path);
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
    setServerActionIsPending(false);

    // console.log(post_id , path, textComment); // TEST
  };

  return (
    <div className="rounded-xl border p-4 bg-[var(--tone-two)] shadow-sm">
      <div className="flex gap-2 md:gap-3 w-full">
        {/* Placeholder avatar */}
        <div className="h-full ">
          <div className="w-7 h-7 md:w-10 md:h-10 min-w-[24px] md:min-w-[32px] relative">
            <Image
              src="/picture.png"
              alt="Avatar"
              fill // Use position:absolute to fill container, must be positioned relative to a positioned relative ancestor.
              className="rounded-full object-cover"
              sizes="small"
            />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-sm md:text-base">
              {"Anonymous"}
            </h4>
            <div className="flex flex-col items-end">
              {commentData.updated_at.toLocaleString() ===
              commentData.created_at.toLocaleString() ? (
                <span
                  className="text-[9px] text-[var(--tone-six)]"
                  title={createdAt_full}
                >
                  {" "}
                  {`Posted ${createdAt_relative}`}
                </span>
              ) : (
                <Fragment>
                  <span
                    className="text-[9px] text-[var(--tone-six)]"
                    title={createdAt_full}
                  >
                    {" "}
                    {`Posted ${createdAt_relative}`}
                  </span>
                  <span
                    className="text-[9px] text-[var(--tone-six)]"
                    title={updatedAt_full}
                  >
                    {`Edited ${updatedAt_relative}`}
                  </span>
                </Fragment>
              )}
            </div>
          </div>
          <CommentBody
            commentData={commentData}
            isEditing={isEditing}
            serverActionIsPending={serverActionIsPending}
            handleDelete={handleDelete}
            handleEditClick={handleEditClick}
            handleCancelEdit={handleCancelEdit}
            handleUpdate={handleUpdate}
            path={path}
          ></CommentBody>
        </div>
      </div>
    </div>
  );
};

const CommentBody: FC<{
  commentData: CommentDataType;
  isEditing: boolean;
  serverActionIsPending: boolean;
  handleEditClick: () => void;
  handleDelete: () => void;
  handleCancelEdit: () => void;
  handleUpdate: (updatedComment: string) => void;
  path: string;
}> = ({
  commentData,
  isEditing,
  serverActionIsPending,
  handleEditClick,
  handleDelete,
  handleCancelEdit,
  handleUpdate,
  path,
}) => {
  const [currentlyEditedContent, setCurrentlyEditedContent] = useState(
    commentData.comment
  );

  // Handles whenever an input on textarea occurs
  const handleChange = (text: string) => {
    setCurrentlyEditedContent(text);
  };

  // Handle key events for textarea, when enter is pressed, update the comment, if esc, cancel edit.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent default Enter behavior (new line)
      handleUpdate(currentlyEditedContent);
    } else if (e.key === "Escape") {
      handleCancelEdit();
      setCurrentlyEditedContent(commentData.comment); // // If cancelled, just dispose of any changes and return to whatever text it was before editing.
    }
  };

  return (
    <Fragment>
      {isEditing ? (
        <Textarea
          className="w-full text-xs md:text-sm mt-1 h-[100px] max-h-[150px] break-all whitespace-pre-line"
          value={currentlyEditedContent}
          onKeyDown={(e) => {
            handleKeyDown(e);
          }}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
        >
          {" "}
        </Textarea>
      ) : (
        <p className="mt-1 text-xs md:text-sm text-[var(--tone-six)] break-all whitespace-pre-line">
          {commentData.comment}
        </p>
      )}

      {isEditing ? (
        <EditCommentButtons
          handleCancelEdit={handleCancelEdit}
          setCurrentlyEditedContent={setCurrentlyEditedContent}
          content={commentData.comment}
          handleUpdate={() => {
            handleUpdate(currentlyEditedContent);
          }}
          updatedComment={currentlyEditedContent}
          serverActionIsPending={serverActionIsPending}
        ></EditCommentButtons>
      ) : (
        <div className="flex justify-between mt-2 ">
          <CommentLikes
            commentId={commentData.id}
            comment_likes={commentData.like_count}
            path={path}
          ></CommentLikes>

          <CommentOptions
            serverActionIsPending={serverActionIsPending}
            handleEditClick={handleEditClick}
            handleDelete={handleDelete}
          ></CommentOptions>
        </div>
      )}
    </Fragment>
  );
};

const EditCommentButtons: FC<{
  handleCancelEdit: () => void;
  setCurrentlyEditedContent: (text: string) => void;
  content: string;
  handleUpdate: (updatedComment: string) => void;
  updatedComment: string;
  serverActionIsPending: boolean;
}> = ({
  handleCancelEdit,
  setCurrentlyEditedContent,
  content,
  handleUpdate,
  updatedComment,
  serverActionIsPending,
}) => {
  const handleCancelEditClick = () => {
    handleCancelEdit();
    setCurrentlyEditedContent(content); // If cancelled, just dispose of any changes and return to whatever text it was before editing.
  };

  return (
    <div className="flex gap-2 justify-end mt-4">
      <Button
        className="p-2 text-xs"
        onChange={() => {}}
        onClick={handleCancelEditClick}
        variant={"secondary"}
      >
        {" "}
        Cancel{" "}
      </Button>
      <Button
        className="p-2 text-xs"
        onClick={() => {
          handleUpdate(updatedComment);
        }}
      >
        {serverActionIsPending ? (
          <Fragment>
            <Loader2Icon className="animate-spin mr-2" />
            Please Wait
          </Fragment>
        ) : (
          "Update Comment"
        )}
      </Button>
    </div>
  );
};

const CommentLikes: FC<{
  commentId: number;
  comment_likes: number;
  path: string;
}> = ({ commentId, comment_likes, path }) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [likes, setLikes] = useState(comment_likes); // Track Holistic Likes (Initial, onClick)

  const handleLikeClick = async () => {
    if (!hasLiked) {
      setHasLiked(true);
      setLikes((prev) => prev + 1);
      const local_likes = likes + 1; // because if i were to use likes in updateCommentLikes, it won't update with the new value until next render.
      const result = await updateCommentLikes(commentId, local_likes, path);
      console.log(`${result.message}, new likes: ${likes}`);
    }
    else{
      setHasLiked(false);
      setLikes((prev) => prev - 1);
      const local_likes = likes - 1; // because if i were to use likes in updateCommentLikes, it won't update with the new value until next render.
      const result = await updateCommentLikes(commentId, local_likes, path);
      console.log(`${result.message}, new likes: ${likes}`);
    }
  };

  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={handleLikeClick}
        className={`hover:text-[var(--accent-primary)] active:text-[var(--accent-primary)] transition-all duration-300 ${
          hasLiked ? "text-[var(--accent-primary)] scale-110 rotate-360" : ""
        }`}
      >
        <ThumbsUpIcon size={18} />
      </button>
      <p className="text-[12px] mt-1">{likes}</p>
    </div>
  );
};

const CommentOptions: FC<{
  serverActionIsPending: boolean;
  handleEditClick: () => void;
  handleDelete: () => void;
}> = ({ serverActionIsPending, handleEditClick, handleDelete }) => {
  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            <button className="p-1 bg-accent rounded-sm text-lg">⋮</button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleEditClick}>Edit</DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onClick={handleDelete}>
            {serverActionIsPending ? (
              <Fragment>
                <Loader2Icon className="animate-spin mr-2" />
                Please Wait
              </Fragment>
            ) : (
              "Delete"
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const CommentContentArea: FC<{ post_id: number; path: string }> = ({
  post_id,
  path,
}) => {
  const [textValue, setTextValue] = useState("");
  const [serverActionIsPending, setServerActionIsPending] = useState(false);
  // Handle key events for textarea, When enter is pressed, add the comment.
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent default Enter behavior (new line)
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setServerActionIsPending(true);
    if (textValue === "") {
      toast.error("Error!", {
        description: `Comment must not be empty`,
        action: { label: "Dismiss", onClick: () => {} },
      });
      setServerActionIsPending(false);
      return;
    }
    const response = await addComment(post_id, path, textValue);
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
    setTextValue(""); // Reset after posting.
    setServerActionIsPending(false);

    // console.log(post_id , path, textComment); // TEST
  };

  return (
    <div className="mt-4 flex flex-col">
      <p className="text-lg text-[var(--tone-six)] my-2">
        {" "}
        Join the discussion
      </p>
      <Textarea
        onChange={(e) => setTextValue(e.target.value)}
        value={textValue}
        rows={5}
        onKeyDown={(e) => {
          handleKeyDown(e);
        }}
        maxLength={500}
        className="bg-White border resize-none h-[100px] border-Light-gray py-2 px-5 rounded-md placeholder:text-start text-Grayish-Blue "
        placeholder="Add a comment..."
      />
      <div className="flex justify-end my-4">
        <Button onClick={handleSubmit} disabled={serverActionIsPending}>
          {serverActionIsPending ? (
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
