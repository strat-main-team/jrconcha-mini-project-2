"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareGithub,
  faSquareXTwitter,
  faLinkedin,
  faSquareFacebook,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

const socials = [
  {
    icon: faSquareGithub,
    href: "https://github.com/miyukiin",
    label: "GitHub",
  },
  {
    icon: faSquareXTwitter,
    href: "https://twitter.com/jhack",
    label: "Twitter",
  },
  {
    icon: faLinkedin,
    href: "https://www.linkedin.com/in/jhack-concha-3b2a65267/",
    label: "LinkedIn",
  },
  {
    icon: faSquareFacebook,
    href: "https://facebook.com/jhack",
    label: "Facebook",
  },
];

export default function SocialLinks() {
  return (
    <div className="flex items-center space-x-4 mt-6">
      {socials.map(({ icon, href, label }) => (
        <Link
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="text-[var(--tone-six)] hover:text-[var(--tone-seven)] hover:scale-105 transition-all"
        >
          <FontAwesomeIcon icon={icon} size="2x" />
        </Link>
      ))}
    </div>
  );
}
