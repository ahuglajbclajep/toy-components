import { useMemo } from "react";
import { Outlet, Link, useParams } from "react-router";
import clsx from "clsx/lite";

import { h2Style } from "./styles";

export const Layout = () => {
  const paths = useMemo(() => {
    const filePaths = Object.keys(import.meta.glob("./stories/*.tsx"));
    return filePaths.map((path) => path.split(/[/.]/).slice(-2)[0]);
  }, []);

  const { stories } = useParams();

  return (
    <div className="bg-gray-900 font-sans text-gray-100">
      <div className="mx-auto flex h-full min-h-screen max-w-screen-lg gap-4 p-8">
        <aside className="flex w-40 flex-col gap-4">
          {paths.map((path) => (
            <Link
              key={path}
              to={path}
              className={clsx(
                h2Style,
                "hover:underline",
                stories === path && "underline",
              )}
            >
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
