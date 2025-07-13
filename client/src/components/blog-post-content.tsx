"use client"; // Without, it results in Runtime Error TypeError: createContext only works in Client Components. Add the "use client" directive at the top of the file to use it.
import { FC } from "react";
import MDEditor from "@uiw/react-md-editor";

interface Props {
  markdown: string;
}

const BlogPostContent: FC<Props> = ({ markdown }: Props) => {
  return (
    <div>
      <MDEditor.Markdown
        source={markdown}
        style={{  backgroundColor: "transparent", color: "var(--tone-six)" }} // color: "var(--tone-six)"
        className="mt-10"
      />
    </div>
  );
};

export default BlogPostContent;
