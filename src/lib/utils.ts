import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function capitalizeFirstLetter(str: string): string {
  // Check if the string is empty
  if (str.length === 0) return str;

  // Capitalize the first letter and concatenate it with the rest of the string
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatOrder(order: number) {
  if (order > 999) {
    return ("000" + order).slice(-4);
  }

  return ("00" + order).slice(-3);
}
