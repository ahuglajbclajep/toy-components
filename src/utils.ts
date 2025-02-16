import { useState, useEffect } from "react";
import clsx from "clsx/lite";

export const inputStyle = clsx(
  "rounded-md border border-gray-300 bg-white p-2 outline-none focus-within:outline-blue-300",
);

export const iframeStyle = clsx("w-full border border-neutral-300");

export const usePromise = <T>(promise: Promise<T>) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    promise.then((result) => setData(result)).catch((err) => setError(err));
  }, [promise]);

  return {
    data,
    error,
  };
};

/**
 * @example
 * camelToSentence("AutoResizingTextarea_") === "Auto resizing textarea"
 */
export const camelToSentence = (input: string) =>
  (input.match(/[A-Z][a-z]*/g) ?? [])
    .map((w, i) => (i === 0 ? w : w.toLocaleLowerCase()))
    .join(" ");
