"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FC } from "react";

function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

const BreadCrumbs: FC = () => {
  const pathName = usePathname();

  // Do not include the / at the beginning of /blog/post-editor for example.
  const pathNames: Array<string> = pathName.slice(1).split("/");

  // This just converts post-editor to Post Editor, remove the "-" and uppercase each letter of the word.
  const formattedPathNames = pathNames.map((element) => {
    const formattedElement = element
      .split("-")
      .map((word) => {
        return capitalizeFirstLetter(word);
      })
      .join(" ");
    return formattedElement;
  });

  return (
    <div className="flex gap-x-2 justify-items-start">
      {formattedPathNames.map((element) => {
        // If current pathname element is the last element of pathNames array, do not render as a link.
        return element === formattedPathNames[formattedPathNames.length - 1] ? (
          <p key={element} className="text-xs font-medium ">
            {" "}
            {element}{" "}
          </p>
        ) : (
          <>
            <Link
              key={element}
              href={`/${element}`}
              className="text-xs font-normal underline underline-offset-2 hover:drop-shadow-[0_0_3px_var(--foreground)] duration-150"
            >
              {element}{" "}
            </Link>
            <p className="text-xs font-medium"> / </p>
          </>
        );
      })}
    </div>
  );
};

export default BreadCrumbs;
