import clsx from "clsx/lite";

import { Tag } from "./types";

type TagProps = {
  tag: Tag;
  onClick: (e: React.MouseEvent) => void;
  isEditing?: boolean;
};

export const ColorTag = ({ tag, onClick, isEditing = false }: TagProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "h-6 rounded-sm bg-blue-500 px-1 py-0.5 text-sm text-white",
        "flex items-center gap-1",
      )}
    >
      <span># {tag}</span>
      {isEditing && <span>✖</span>}
    </button>
  );
};

export const tagContainerStyle = clsx("flex flex-wrap items-center gap-1");
