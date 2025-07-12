import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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

export function generateSlug(id: number, title: string) {
  return `/blog/${id}-${title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "")}`;
}

export const formatDate = (dateObject: Date) => {
  return `${
    monthNames[dateObject.getMonth()]
  } ${dateObject.getDay()}, ${dateObject.getFullYear()}`;
};


export function formatCommentDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat("en-US", {
    month: "long",       // "July"
    day: "2-digit",      // "12"
    year: "numeric",     // "2025"
    hour: "numeric",     // "8"
    minute: "2-digit",   // "56"
    hour12: true,        // "PM"
  })
    .format(d).replace("at", "|")
}