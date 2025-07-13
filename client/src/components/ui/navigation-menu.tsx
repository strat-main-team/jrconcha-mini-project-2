"use client";
import { usePathname } from "next/navigation";
import {
  Drawer,
  //   DrawerClose,
  DrawerContent,
  DrawerDescription,
  //   DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { FC, JSX } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NavigationMenu: FC = () => {
  const pathname = usePathname();
  return (
    <div className="flex items-center h-full gap-2">
      {pages.map((item) => {
        const isActive = isPathActive(pathname, item.slug);
        return (
          <Link key={item.label} href={`/${item.slug}`}>
            <div
              className={`flex items-center gap-2 p-2 text-sm transition-all duration-75 rounded-xl w-full hover:underline hover:bg-[var(--accent-primary-light)] ${
                isActive ? "bg-[var(--accent-primary-light)] underline" : ""
              }`}
            >
              {item.icon}
              <p className="font-medium lg:text-lg"> {item.label} </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

function isPathActive(pathname: string, slug: string) {
  return slug === "/" ? pathname === "/" : pathname.startsWith(`/${slug}`);
}

const pages: Array<{ label: string; slug: string; icon: JSX.Element }> = [
  {
    label: "Home",
    slug: "/",
    icon: (
      <Image
        src="/home_icon.png"
        width={22}
        height={22}
        alt="Pixel art of a home"
      ></Image>
    ),
  },
  {
    label: "Blog",
    slug: "blog",
    icon: (
      <Image
        src="/blog_icon.png"
        width={22}
        height={22}
        alt="Pixel art of a Blog"
      ></Image>
    ),
  },
];

const MobileNavigationMenu: FC = () => {
  // State management for whether the drawer is open or not.
  const [drawerStatus, SetDrawerStatus] = useState(false);
  const pathname = usePathname();
  // Check if path is active by comparing the /[slug] to the current pathname.
  // EX: blog button is active if pathname starts with /blog

  return (
    // https://vaul.emilkowal.ski/api#content
    <Drawer
      direction="right"
      snapPoints={[0.9]}
      open={drawerStatus}
      dismissible={true}
      onOpenChange={(open) => {
        SetDrawerStatus(open);
      }}
    >
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="focus:bg-accent]"
          onClick={() => SetDrawerStatus(true)}
        >
          <FontAwesomeIcon size="lg" icon={faBars} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="border-l-0">
        <DrawerHeader>
          <DrawerTitle>Navigation Menu</DrawerTitle>
          <DrawerDescription>Explore at your discretion.</DrawerDescription>
        </DrawerHeader>
        <hr className="mb-5"></hr>
        {pages.map((item) => {
          const isActive = isPathActive(pathname, item.slug);

          return (
            <Link
              onClick={() => SetDrawerStatus(false)}
              key={item.label}
              href={`/${item.slug}`}
              className={`w-full transition-all duration-75 ${
                isActive ? "ml-4" : ""
              }`}
            >
              <div
                className={`flex items-center gap-2 p-4 text-sm transition-all duration-75 rounded-xl w-full  ${
                  isActive ? "bg-[var(--accent-primary-light)]" : ""
                }`}
              >
                {item.icon}
                <p className="font-medium"> {item.label} </p>
              </div>
            </Link>
          );
        })}
      </DrawerContent>
    </Drawer>
  );
};

export { MobileNavigationMenu, NavigationMenu };
