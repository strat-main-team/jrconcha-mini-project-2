import { FC } from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { Loader2Icon } from "lucide-react";

const AddBlogPostButton: FC = () => {
  // Handle Parent Form state
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {" "}
      {pending ? (
        <>
          <Loader2Icon className="animate=spin" /> Please Wait
        </>
      ) : (
        "Create Blog Post"
      )}
    </Button>
  );
};

export default AddBlogPostButton;
