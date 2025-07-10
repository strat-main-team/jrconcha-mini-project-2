import { FC } from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { Loader2Icon } from "lucide-react";

const AddBlogPostButton: FC = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2Icon className="animate-spin mr-2" />
          Please Wait
        </>
      ) : (
        "Create Blog Post"
      )}
    </Button>
  );
};

export default AddBlogPostButton;
