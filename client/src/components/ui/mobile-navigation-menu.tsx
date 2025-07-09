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
import { House, StickyNote } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function isPathActive(pathname: string, slug: string) {
  return slug === "/" ? pathname === "/" : pathname.startsWith(`/${slug}`);
}

const pages: Array<{ label: string; slug: string; icon: JSX.Element }> = [
  { label: "Home", slug: "/", icon: <House size={22} strokeWidth={2} /> },
  {
    label: "Blog",
    slug: "blog",
    icon: <StickyNote size={22} strokeWidth={2} />,
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
                className={`flex items-center gap-2 p-4 text-sm transition-all duration-75 ${
                  isActive
                    ? "rounded-xl w-full bg-[var(--accent-primary-light)]"
                    : ""
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

export default MobileNavigationMenu;
export { pages, isPathActive };
