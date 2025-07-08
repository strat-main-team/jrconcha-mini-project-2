import Link from "next/link";
import Image from "next/image";
import { FC } from "react";
import { ModeToggle } from "./ui/mode-toggle";

const Header: FC = () => {
  return (
    <div className="h-[60px] px-[16px] flex items-center sticky top-0 bg-[var(--background)] md:backdrop-blur-sm border-b-1 border-b-[var(--border-color)]">
      <Link
        className=" flex gap-x-3 hover:underline hover:decoration-2 hover:outline-1 active:outline-1 font-bold rounded-2xl px-2"
        href={"/"}
      >
        <div>
          <Image
            width={32}
            height={32}
            src="/logo2.png"
            alt="Illustration of a Laptop as a Logo"
          ></Image>
        </div>
        <h1 className="text-md flex items-center">Zeteo.dev</h1>
      </Link>
      <ModeToggle></ModeToggle>
    </div>
  );
};

export { Header };
