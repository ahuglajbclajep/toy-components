import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx/lite";

import { inputStyle } from "../utils";

type Props = {
  maxLength?: number;
  className?: string; // NOTE: min-height や max-height も効く
};

export const AutoResizingTextarea = ({ maxLength, className }: Props) => {
  const [content, setContent] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.height = "auto";
    ref.current.style.height = `${ref.current.scrollHeight}px`;
  }, [content]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.currentTarget.value;
      if (maxLength && value.length > maxLength) return;
      setContent(value);
    },
    [],
  );

  return (
    <textarea
      ref={ref}
      rows={1}
      value={content}
      onChange={handleChange}
      className={clsx(
        inputStyle,
        "resize-none overflow-y-hidden break-words text-base",
        className,
      )}
    />
  );
};
