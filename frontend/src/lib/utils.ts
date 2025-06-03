import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalize = (text: string) => {
  return text ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() : "";
};

export const getFirstLetter = (text: string): string => {
  const match = text.match(/[a-zA-Z]/);
  return match ? match[0].toUpperCase() : "";
};
