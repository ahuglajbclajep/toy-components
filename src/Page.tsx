import { useParams, useNavigate } from "react-router";
import { usePromise, camelToSentence } from "./utils";

export const Page = () => {
  const { stories } = useParams();
  const { data } = usePromise<Record<string, () => React.JSX.Element>>(
    // NOTE: import(path) のように変数をそのまま渡すと vite の dynamic import の対象にならない
    import(`./stories/${stories}.tsx`),
  );

  const navigate = useNavigate();
  if (!stories || !data) {
    navigate("/");
    return;
  }

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">{camelToSentence(stories)}</h1>
        <SourcePath stories={stories} />
      </section>
      {Object.entries(data).map(([story, Component]) => (
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
