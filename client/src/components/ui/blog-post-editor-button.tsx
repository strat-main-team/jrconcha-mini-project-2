import { FC } from "react";
import { Button } from "./button";
import { useFormStatus } from "react-dom";
import { Loader2Icon } from "lucide-react";

interface Props {
  isEditing: boolean;
}

const BlogPostEditorButton: FC<Props> = ({ isEditing }) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
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

export default BlogPostEditorButton;
