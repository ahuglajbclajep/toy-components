import clsx from "clsx/lite";

export const inputStyle = clsx(
  "rounded-md border border-gray-300 bg-white p-2 outline-none focus-within:outline-blue-300",
);

export const iconLikeStyle = clsx(
  "flex size-6 items-center justify-center text-sm font-bold",
);

/**
 * @example
 * camelToSentence("AutoResizingTextarea_") === "Auto resizing textarea"
 */
export const camelToSentence = (input: string) =>
  (input.match(/[A-Z][a-z]*/g) ?? [])
    .map((w, i) => (i === 0 ? w : w.toLocaleLowerCase()))
    .join(" ");
