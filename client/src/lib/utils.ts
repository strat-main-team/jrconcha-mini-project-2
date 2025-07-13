import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function generateBlogPostSlug(id: number, title: string) {
  return `/blog/${id}-${title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "")}`;
}

export const formatDate = (dateObject: Date): string => {
  const month = monthNames[dateObject.getMonth()];
  const day = dateObject.getDate();
  const year = dateObject.getFullYear();

  let hours = dateObject.getHours();
  const minutes = dateObject.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12; // Convert 0/13/14 → 12/1/2

  return `${month} ${day}, ${year} | ${hours}:${minutes} ${ampm}`;
};

export function getRelativeTimeWithExactTooltip(date: Date | string): {
  relative: string;
  full: string;
} {
  const d = typeof date === "string" ? new Date(date) : date;

  return {
    relative: formatDistanceToNow(d, { addSuffix: true }),
    full: format(d, "MMMM d, yyyy 'at' h:mm a"),
  };
}