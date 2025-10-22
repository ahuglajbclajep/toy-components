import { useMemo, useRef, useEffect } from "react";
import { Outlet, Link, useParams, useLocation } from "react-router";
import clsx from "clsx/lite";

import { iconLikeStyle } from "./utils";

export const Layout = () => {
  const paths = useMemo(() => {
    const filePaths = Object.keys(import.meta.glob("./stories/*.tsx"));
    return filePaths.map((path) => path.split(/[/.]/).slice(-2)[0]);
  }, []);
  const { stories } = useParams();

  const detailsRef = useNavigationMenu();

  return (
    <div className="bg-neutral-50 font-sans text-neutral-700">
      <div
        className={clsx(
          "mx-auto h-full min-h-screen max-w-(--breakpoint-lg) p-8",
          "flex flex-col gap-4 sm:flex-row",
        )}
      >
        <details
          ref={detailsRef}
          className={clsx(
            "group -mx-4 rounded-md border border-neutral-300 p-4",
            "sm:mx-0 sm:w-40 sm:border-none sm:p-0",
          )}
        >
          <summary
            className={clsx(
              "flex list-none items-center justify-between text-xl group-open:mb-4 sm:hidden",
              "[&::-webkit-details-marker]:hidden", // for Safari
            )}
          >
            Navigation
            <span
              className={clsx(
                iconLikeStyle,
                "transition group-open:rotate-180",
              )}
            >
              ▽
            </span>
          </summary>
          <nav className="flex flex-col gap-4">
            <Link to="/" className={linkStyle(!stories)}>
              Welcome
            </Link>
            {paths.map((path) => (
              <Link
                key={path}
                to={path}
                className={linkStyle(stories === path)}
              >
                {path}
              </Link>
            ))}
          </nav>
        </details>
        <main className="flex-1 wrap-break-word">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

/**
 * 画面幅や移動に合わせて、`<details />` の open 属性をリセットするフック
 */
const useNavigationMenu = () => {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const isSm = useRef(true);
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 640px)");

    if (!detailsRef.current) return;
    detailsRef.current.open = mql.matches;
    isSm.current = mql.matches;

    const onChange = (e: MediaQueryListEvent) => {
      if (!detailsRef.current) return;
      detailsRef.current.open = e.matches;
      isSm.current = e.matches;
    };
    mql.addEventListener("change", onChange);
    return () => void mql.removeEventListener("change", onChange);
  }, []);

  const location = useLocation();
  useEffect(() => {
    if (!detailsRef.current || isSm.current) return;
    detailsRef.current.open = false;
  }, [location]);

  return detailsRef;
};

const linkStyle = (selected: boolean) =>
  clsx(
    "truncate rounded-md p-2 text-xl hover:bg-neutral-200",
    selected && "bg-neutral-200",
  );
