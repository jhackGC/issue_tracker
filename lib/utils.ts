/**
 * Utility functions for various common tasks
 * Shared across the application, client and server components
 * Avoid adding browser-only logic/dependecies or server-only logic/dependecies here.
 */

import { type ClassValue, clsx } from "clsx";
import { formatDistanceToNow } from "date-fns";
import { twMerge } from "tailwind-merge";

// Utility function for combining Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date to relative time (e.g., "2 days ago")
export function formatRelativeTime(date: Date | string) {
  const parsedDate = typeof date === "string" ? new Date(date) : date;
  return formatDistanceToNow(parsedDate, { addSuffix: true });
}

// Simple validation check for email
// @TODO consider using a more robust validation library
export function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

// Creates a URL-friendly slug from a string
// @TODO consider using lodash
export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export function mockDelay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
