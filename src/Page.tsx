import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";

import { camelToSentence } from "./utils";

export const Page = () => {
  const stories = useParams().stories!;

  type ImportResult = Record<string, () => React.JSX.Element> | Error;
  const [result, setResult] = useState<ImportResult | null>(null);
  useEffect(() => {
    import(`./stories/${stories}.tsx`)
      .then(setResult)
      .catch(() => setResult(Error(`Story module not found: ${stories}`)));
  }, [stories]);

  const navigate = useNavigate();
  useEffect(() => {
    if (result instanceof Error) {
      navigate("/", { replace: true });
    }
  }, [result]);

  if (!result || result instanceof Error) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">{camelToSentence(stories)}</h1>
        <SourcePath stories={stories} />
      </section>
      {Object.entries(result).map(([story, Component]) => (
        <section key={story} className="flex flex-col gap-4">
          <h2 className="text-xl">{camelToSentence(story)}</h2>
          <Component />
        </section>
      ))}
    </div>
  );
};

const SourcePath = ({ stories }: { stories: string }) => {
  const baseUrl = "https://github.com/ahuglajbclajep/toy-components/blob/main/";
  const filePath = `src/stories/${stories}.tsx`;
  return (
    <p>
      source:{" "}
      <a href={baseUrl + filePath} target="_blank" className="underline">
        {filePath}
      </a>
    </p>
  );
};
