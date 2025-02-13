export const Welcome = () => {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Welcome!</h1>
      <article>
        <p>This application consists of the following two parts:</p>
        <ul className="list-disc space-y-4 p-4">
          <li>
            <p>
              <Code>main.tsx</Code> and <Code>stories/</Code>
            </p>
            <p>
              A system that provides simple sample pages based on the filenames
              in <Code>stories/</Code>. By writing <Code>.tsx</Code> files in a
              format similar to{" "}
              <ExLink href="https://storybook.js.org/docs/api/csf">
                Component Story Format
              </ExLink>{" "}
              (note: not compatible), you can easily create a component catalog.
            </p>
          </li>
          <li>
            <p>
              Components displayed in <Code>stories/</Code> (e.g.{" "}
              <Code>AutoResizingTextarea.tsx</Code>)
            </p>
            <p>
              A proof of concept (PoC) for slightly complex React components.
              Includes components implemented in other repositories.
            </p>
          </li>
        </ul>
        <p>
          GitHub 🐙:{" "}
          <ExLink href="https://github.com/ahuglajbclajep/toy-components">
            ahuglajbclajep/toy-components
          </ExLink>
        </p>
      </article>
    </section>
  );
};

const Code = ({ children }: { children: string }) => (
  <code className="rounded-xs bg-neutral-100 px-0.5">{children}</code>
);

const ExLink = ({ href, children }: { href: string; children: string }) => (
  <a href={href} target="_blank" className="underline">
    {children}
  </a>
);
