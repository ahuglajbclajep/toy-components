import { useCallback, useEffect, useRef, useState } from "react";
import { inputStyle } from "../styles";
import clsx from "clsx/lite";

type Props = {
  maxLength?: number;
  minHeight?: number; // 1行分の高さよりは小さくならない
};

export const AutoResizingTextarea = ({ maxLength, minHeight }: Props) => {
  const [content, setContent] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.height = minHeight ? `${minHeight}px` : "auto";
    ref.current.style.height = `${ref.current.scrollHeight}px`;
  }, [content, minHeight]);

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
        "box-content resize-none overflow-y-hidden break-words text-base",
      )}
    />
  );
};
