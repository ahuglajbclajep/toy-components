import { useEffect, useRef } from "react";

import { useCatApi } from "./hooks";

import { RecentUserIcons } from "../components/RecentUserIcons";
import { useTwitter, useIsEmbedRendered } from "../hooks/useTwitter";

export const RecentUserIcons_ = () => {
  const data = useCatApi();
  return (
    <div className="no-scrollbar overflow-scroll">
      <RecentUserIcons users={data} />
    </div>
  );
};

export const EmbeddedTweet = () => {
  const ref = useRef<HTMLDivElement>(null);

  const twttr = useTwitter();
  useEffect(() => {
    if (ref.current && twttr) {
      twttr.widgets.createTweet("1311692266260447232", ref.current, {
        cards: "hidden",
      });
    }
  }, [twttr]);

  const isRendered = useIsEmbedRendered(ref);

  return (
    <div className="flex min-h-[260px] flex-col justify-between">
      <div ref={ref} className="*:my-0!" />
      <span>{isRendered ? "Loaded ✅" : "Loading...⏳"}</span>
    </div>
  );
};
