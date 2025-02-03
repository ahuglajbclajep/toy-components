import { useCallback, useEffect, useRef, useState } from "react";
import { inputStyle } from "../styles";
import clsx from "clsx/lite";

type Props = {
  maxLength?: number;
  minHeight?: number;
};

export const AutoHeightTextarea = ({ maxLength, minHeight = 24 }: Props) => {
  const [content, setContent] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    console.log(minHeight);
    ref.current.style.height = `${minHeight}px`; // 必須、これより小さくならない
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
      value={content}
      onChange={handleChange}
      className={clsx(
        inputStyle,
        "box-content resize-none overflow-y-hidden break-words text-base",
      )}
    />
  );
};
