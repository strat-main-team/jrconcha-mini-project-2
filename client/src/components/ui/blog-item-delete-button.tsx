import { FC, useState } from "react";
import { Button } from "./button";
import { Loader2Icon } from "lucide-react";

interface Props {
  id: number;
  handleEdit: (id: number) => void;
}

const BlogItemDeleteButton: FC<Props> = ({ id, handleEdit }) => {
  const [state, setState] = useState(false);
  return (
    <Button
      variant="destructive"
      size="sm"
      className="text-xs px-2 py-1"
      onClick={() => {
        setState(true);
        handleEdit(id);
      }}
    >
      {state ? (
        <>
          <Loader2Icon className="animate-spin mr-2" />
        </>
      ) : (
        "Delete"
      )}
    </Button>
  );
};

export default BlogItemDeleteButton;
