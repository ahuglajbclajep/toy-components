import { useState, useCallback } from "react";
import clsx from "clsx/lite";

import { iconLikeStyle } from "./utils";

type Props = {
  src: string;
  defaultHeight: number;
};

export const ExpandableIFrame = ({ src, defaultHeight }: Props) => {
  const [expand, setExpand] = useState(false);
  const onClick = useCallback(() => {
    // NOTE: iOS Safari では、overflowY = "hidden" だと機能しない
    document.body.style.overflow = expand ? "visible" : "hidden";
    setExpand(!expand);
  }, [expand]);

  return (
    <div
      className={clsx(
        "w-full border border-neutral-300 bg-white",
        expand && "fixed left-0 top-0 border-none",
      )}
    >
      <div className="relative">
        <iframe
          src={src}
          height={expand ? window.innerHeight : defaultHeight}
          className="w-full"
        />
        <button
          className={clsx(
            iconLikeStyle,
            "absolute right-0 top-0 rounded-bl-md bg-neutral-200",
          )}
          onClick={onClick}
        >
          {expand ? "↙" : "↗"}
        </button>
      </div>
    </div>
  );
};
