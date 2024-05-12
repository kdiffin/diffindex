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

export function convertToSnakeCase(text: string) {
  return text
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("_");
}

export function formatOrder(order: number) {
  if (order > 9999) {
    return ("0000" + order).slice(-5);
  }

  if (order > 999) {
    return ("000" + order).slice(-4);
  }

  return ("00" + order).slice(-3);
}

// todo: write comments for these
type DefenseAttackObject = Record<string, Record<string, number>>;

export function invertObject(
  obj: Record<string, number>,
): Record<number, string[]> {
  const invertedObj: Record<number, string[]> = {};
  for (const key in obj) {
    const value = obj[key];
    if (!invertedObj[value ? value : 0]) {
      invertedObj[value ? value : 0] = [];
    }

    // @ts-expect-error ts false flag as it has been checked above (I think so atleast, may be an oversight on my part)
    invertedObj[value ? value : 0].push(key);
  }
  return invertedObj;
}

export function invertDefenseAttackObject(
  obj: DefenseAttackObject,
): DefenseAttackObject {
  const invertedObject: DefenseAttackObject = {};
  for (const key in obj) {
    // @ts-expect-error honestly dont know how to fix this in a ts circumstance
    invertedObject[key] = invertObject(obj[key]);
  }
  return invertedObject;
}
