import { useCallback } from "react";

import { Tag } from "./types";

type TagProps = {
  tag: Tag;
  onClick: () => void;
};

export const ColorTag = ({ tag, onClick }: TagProps) => {
  return (
    <button
      onClick={onClick}
      className="rounded-sm bg-blue-500 px-1 py-0.5 text-sm text-gray-100"
    >
      #{tag}
    </button>
  );
};

type TagDisplayProps = {
  tags: Tag[];
  onClickTag: (tag: Tag) => void;
};

export const TagDisplay = ({ tags, onClickTag }: TagDisplayProps) => {
  const onClick = useCallback(
    (tag: string) => () => {
      onClickTag(tag);
    },
    [onClickTag],
  );

  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag) => (
        <ColorTag key={tag} tag={tag} onClick={onClick(tag)} />
      ))}
    </div>
  );
};
