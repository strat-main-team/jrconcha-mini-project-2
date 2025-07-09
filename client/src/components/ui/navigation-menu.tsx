"use client";
import Link from "next/link";
import { FC } from "react";
import { pages, isPathActive } from "./mobile-navigation-menu";
import { usePathname } from "next/navigation";

const NavigationMenu: FC = () => {
  const pathname = usePathname();
  return (
    <div className="flex items-center h-full gap-2">
      {pages.map((item) => {
        const isActive = isPathActive(pathname, item.slug);
        return (
          <Link key={item.label} href={`/${item.slug}`}>
            <div
              className={`flex items-center gap-2 p-2 text-sm transition-all duration-75 ${
                isActive
                  ? "rounded-xl w-full bg-[var(--accent-primary-light)]"
                  : ""
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

export default NavigationMenu;
