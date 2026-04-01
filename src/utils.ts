import clsx from "clsx/lite";

export const baseStyle = clsx(
  "rounded-md border border-border bg-bg-white p-2",
);

export const textInputStyle = clsx(
  baseStyle,
  "cursor-text placeholder:text-text-muted",
  "focus-within:border-focus focus-within:outline focus-within:outline-focus",
  "aria-invalid:border-danger-muted aria-invalid:outline aria-invalid:outline-danger-muted",
);

export const buttonStyle = clsx(
  baseStyle,
  "cursor-pointer transition-colors hover:bg-bg-muted active:bg-bg-emphasis",
  "disabled:cursor-not-allowed disabled:bg-bg-muted",
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
