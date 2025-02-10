import { useState, useEffect } from "react";
import { useParams } from "react-router";

export const Page = () => {
  const { stories } = useParams();

  const { data } = usePromise<Record<string, () => React.JSX.Element>>(
    // NOTE: import(path) のように変数をそのまま渡すと vite の dynamic import の対象にならない
    import(`./stories/${stories}.tsx`),
  );

  if (!stories || !data) {
    return;
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">{camelToSentence(stories)}</h1>
      {Object.entries(data).map(([story, Component]) => (
        <section key={story} className="flex flex-col gap-4">
          <h2 className="text-xl">{camelToSentence(story)}</h2>
          <Component />
        </section>
      ))}
    </div>
  );
};

/**
 * @example
 * camelToSentence("AutoResizingTextarea_") === "Auto resizing textarea"
 */
const camelToSentence = (input: string) =>
  (input.match(/[A-Z][a-z]*/g) ?? [])
    .map((w, i) => (i === 0 ? w : w.toLocaleLowerCase()))
    .join(" ");

const usePromise = <T,>(promise: Promise<T>) => {
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
