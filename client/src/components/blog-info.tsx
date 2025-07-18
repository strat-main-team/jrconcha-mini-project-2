import { FC, Fragment } from "react";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { BlogPostDataType } from "@/types/DataTypes";
import BreadCrumbs from "./ui/breadcrumbs";

interface Props {
  blogPostData: BlogPostDataType;
}

const BlogInfo: FC<Props> = ({ blogPostData }) => {
  return (
    <Fragment>
      <BreadCrumbs></BreadCrumbs>
      <h1 className="mt-10 text-4xl lg:text-5xl 3xl-text-6xl font-semibold break-all w-full">{blogPostData.title}</h1>
      <hr className="mt-5 border-t border-[var(--tone-four)]"></hr>
      <div className="flex w-full mt-5 gap-3 items-center">
        <div className="w-9 h-9 md:w-12 md:h-12 min-w-[36px] md:min-w-[48px] relative">
          <Image
            src="/picture.png"
            alt="Avatar"
            fill // Use position:absolute to fill container, must be positioned relative to a positioned relative ancestor.
            className="rounded-full object-cover"
            sizes="small"
          />
        </div>
        {/* Placeholder until Auth Feature is done: format: Author Name - Author Description */}
        <div className="flex flex-col">
          <p className="text-sm text-[var(--tone-six)] font-medium">
            {" "}
            By <span className="underline">Anonymous</span>
          </p>
          <p className="text-xs md:text-sm text-[var(--tone-six)]">
            {" "}
            Anonymous is a sneaky writer, publishing baffling articles on the
            regular.{" "}
          </p>
        </div>
      </div>
      <div id="date" className="mt-2">
        <p className="text-xs md:text-sm text-[var(--tone-six)]">
          {" "}
          <span className="font-medium">Published:</span> {formatDate(blogPostData.created_at)}
        </p>
        {formatDate(blogPostData.created_at) ===
        formatDate(blogPostData.updated_at) ? (
          ""
        ) : (
          <p className="text-xs md:text-sm text-[var(--tone-six)]">
            {" "}
            <span className="font-medium">Last Updated:</span> {formatDate(blogPostData.updated_at)}
          </p>
        )}
      </div>
      <hr className="mt-5 border-t border-[var(--tone-four)]"></hr>
      <div className="w-full h-[300px] md:h-[500px] 3xl:[700px] relative mt-5">
          <Image
            src={blogPostData.image_file_path}
            alt="Cover page of post"
            fill // Use position:absolute to fill container, must be positioned relative to a positioned relative ancestor.
            className="rounded-sm object-cover"
            sizes="small"
          />
        </div>
    </Fragment>
  );
};

export default BlogInfo;
