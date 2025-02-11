import { useMemo } from "react";
import { Outlet, Link, useParams } from "react-router";
import clsx from "clsx/lite";

export const Layout = () => {
  const paths = useMemo(() => {
    const filePaths = Object.keys(import.meta.glob("./stories/*.tsx"));
    return filePaths.map((path) => path.split(/[/.]/).slice(-2)[0]);
  }, []);

  const { stories } = useParams();

  return (
    <div className="bg-neutral-50 font-sans text-neutral-700">
      <div className="mx-auto flex h-full min-h-screen max-w-screen-lg gap-4 p-8">
        <aside className="flex w-40 flex-col gap-4">
          <Link to="/" className={linkStyle(!stories)}>
            Welcome
          </Link>
          {paths.map((path) => (
            <Link key={path} to={path} className={linkStyle(stories === path)}>
              {path}
            </Link>
          ))}
        </aside>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const linkStyle = (selected: boolean) =>
  clsx(
    "rounded-md p-2 text-xl hover:bg-neutral-200",
    selected && "bg-neutral-200",
  );
