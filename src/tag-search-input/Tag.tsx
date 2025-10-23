import clsx from "clsx/lite";

import { Tag } from "./types";

type TagProps = {
  tag: Tag;
  onClick: () => void;
  isEditing?: boolean;
};

export const ColorTag = ({ tag, onClick, isEditing = false }: TagProps) => {
  return (
    <button
      // NOTE: tabindex を明示的に指定しないと、Chrome 以外では e.relatedTarget が空になる
      tabIndex={0}
      onClick={onClick}
      className={clsx(
        "h-6 cursor-pointer rounded-md bg-blue-500 px-1.5 py-0.5 text-sm text-white",
        "flex items-center gap-1",
      )}
    >
      <span># {tag}</span>
      {isEditing && <span>✖</span>}
    </button>
  );
};

export const tagContainerStyle = clsx("flex flex-wrap items-center gap-2");
