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
      onClick={onClick}
      className={clsx(
        "max-h-min rounded-sm bg-blue-500 px-1 py-0.5 text-sm text-gray-100",
        "flex items-center gap-1",
      )}
    >
      <span>#{tag}</span>
      {isEditing && <span>✖</span>}
    </button>
  );
};
