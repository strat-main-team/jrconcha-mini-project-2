"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--tone-two)] text-[var(--tone-one)] py-5 border-t border-[var(--tone-three)]">
      <div className="container mx-auto px-4 flex flex-col items-center md:flex-row md:justify-center md:gap-x-10">
        
        {/* Links */}
        <div className="grid grid-cols-2 gap-6 text-sm text-center md:text-left">
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-[var(--tone-five)] text-lg uppercase">
              Explore
            </p>
            <Link
              className="text-[var(--tone-six)] font-medium hover:text-[var(--accent-primary)]"
              href="/"
            >
              Home
            </Link>
            <Link
              className="text-[var(--tone-six)] font-medium hover:text-[var(--accent-primary)]"
              href="/blog"
            >
              Blog
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-[var(--tone-five)] text-lg uppercase">
              Social
            </p>
            <Link
              className="text-[var(--tone-six)] font-medium hover:text-[var(--accent-primary)]"
              href="https://github.com/"
              target="_blank"
            >
              GitHub
            </Link>
            <Link
              className="text-[var(--tone-six)] font-medium hover:text-[var(--accent-primary)]"
              href="https://twitter.com/"
              target="_blank"
            >
              Twitter
            </Link>
            <Link
              className="text-[var(--tone-six)] font-medium hover:text-[var(--accent-primary)]"
              href="https://linkedin.com/"
              target="_blank"
            >
              LinkedIn
            </Link>
          </div>
        </div>

        {/* Gif & Support */}
        <div className="flex flex-col items-center justify-center md:mt-0 gap-2">
          <Image
            width={180}
            height={180}
            src="/banner8-ezgif.com-crop.gif"
            alt="Illustration of a Computer Programmer"
          />
          <p className="font-medium text-[var(--tone-six)]">
            &copy; {new Date().getFullYear()} Zeteo.dev
          </p>
         
        </div>
         <Link
            href="https://www.buymeacoffee.com/yourusername"
            target="_blank"
            className="mt-2"
          >
            <Image
              src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
              alt="Buy Me A Coffee"
              width={150}
              height={50}
              className="rounded-md hover:opacity-80 transition-opacity"
            />
          </Link>
      </div>
    </footer>
  );
}
