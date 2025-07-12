"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FC, Fragment } from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

const BreadCrumbs: FC = () => {
  const pathName = usePathname();

  // Do not include the / at the beginning of /blog/post-editor for example.
  const pathNames: Array<string> = pathName.slice(1).split("/");

  // converts slug post-editor to label Post Editor, return array of objects {slug, label}
  const pathNamesObject = pathNames.map((pathName) => {
    const formattedElement = pathName
      .split("-")
      .filter((pathName) => isNaN(Number(pathName)) === true) // Remove the Number Part, for the purpose of blog breadcrumbs
      .map((word) => capitalizeFirstLetter(word))
      .join(" ");

    return {slug: pathName, label: formattedElement };
  }, []);

  return (
    <div className="flex gap-x-2 justify-items-start">
      {pathNamesObject.length > 1 ? (
        <Link
          className="flex items-center justify-center h-[12px] w-[12px] md:h-[20px] md:w-[20px] mr-2"
          href={`/${pathNamesObject[pathNamesObject.length - 2].slug}`} // Just go back to the previous page.
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
          ></FontAwesomeIcon>
        </Link>
      ) : (
        <Fragment></Fragment>
      )}
      {pathNamesObject.map((pathNameObject) => {
        // If current pathname element is the last element of pathNames array, do not render as a link.
        return pathNameObject === pathNamesObject[pathNamesObject.length - 1] ? (
          <p key={pathNameObject.label} className="text-xs font-medium md:text-sm ">
            {" "}
            {pathNameObject.label}{" "}
          </p>
        ) : (
          <Fragment key={pathNameObject.label}>
            <Link
              key={pathNameObject.label}
              href={`/${pathNameObject.slug}`}
              className="text-xs font-normal underline underline-offset-2 hover:drop-shadow-[0_0_3px_var(--foreground)] duration-150 md:text-sm"
            >
              {pathNameObject.label}{" "}
            </Link>
            <p
              key={`text-${pathNameObject}`}
              className="text-xs font-medium md:text-sm"
            >
              {" "}
              /{" "}
            </p>
          </Fragment>
        );
      })}
    </div>
  );
};

export default BreadCrumbs;
