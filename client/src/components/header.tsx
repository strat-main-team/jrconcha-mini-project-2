import Link from "next/link";
import Image from "next/image";
import { FC } from "react";
import ModeToggle from "./ui/mode-toggle";
import MobileNavigationMenu from "./ui/mobile-navigation-menu";
import NavigationMenu from "./ui/navigation-menu";

const Header: FC = () => {
  return (
    // z-10 so that it renders above the switch thumb component, but the switch thumb is still interactable
    <div className="z-10 h-[60px] lg:h-[80px] px-[16px] flex items-center justify-between sticky top-0 bg-[var(--background)] md:bg-transparent md:backdrop-blur-sm border-b-1 border-b-[var(--border-color)]">
      <Link
        className=" flex gap-x-3 hover:underline hover:decoration-2 hover:outline-1 active:outline-1 font-bold rounded-2xl px-2"
        href={"/"}
      >
        <div id="logo">
          <Image
            width={32}
            height={32}
            src="/logo2.png"
            alt="Illustration of a Laptop as a Logo"
          ></Image>
        </div>
        <h1 className="text-md lg:text-lg flex items-center">Zeteo.dev</h1>
      </Link>
      <div className="hidden md:block">
          <NavigationMenu></NavigationMenu>
        </div>
      <div className="flex gap-2">
        {/* Conditionally show the appropriate nav component, prefer this way as it isn't expensive to render both in the dom */}
        <div className="block md:hidden">
          <MobileNavigationMenu></MobileNavigationMenu>
        </div>
        <ModeToggle></ModeToggle>
      </div>
    </div>
  );
};

export default Header;
