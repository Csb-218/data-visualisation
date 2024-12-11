import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function  convertDateFormat(dateString:string) {
  // Split the input string by '/'
  const [day, month, year] = dateString.split('/');

  // Return the rearranged date string in 'yyyy-mm-dd' format
  return `${year}-${month}-${day}`;
}

export function getRandomHexColor() {
  // Generate a random number between 0 and 16777215 (0xFFFFFF)
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);

  // Pad the result with leading zeros to ensure it's always 6 characters long
  return `#${randomColor.padStart(6, '0')}`;
}

export const updateQueryParam = (key: string, value: string ) => {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  return url.toString();
};

export const removeQueryParam = (key: string) => {
  const url = new URL(window.location.href);
  url.searchParams.delete(key);
  // console.log(url,key,url.toString())
  return url.toString();
};