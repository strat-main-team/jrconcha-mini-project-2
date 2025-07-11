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