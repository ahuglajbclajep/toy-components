import { useCallback } from "react";
import clsx from "clsx/lite";

import { ColorTag } from "./Tag";
import { Tag } from "./types";

type Props = {
  tags: Tag[];
  onClickTag: (tag: Tag) => void;
};

export const TagDisplay = ({ tags, onClickTag }: Props) => {
  const onClick = useCallback(
    (tag: string) => () => {
      onClickTag(tag);
    },
    [onClickTag],
  );

  return (
    <div className={tagContainerStyle}>
      {tags.map((tag) => (
        <ColorTag key={tag} tag={tag} onClick={onClick(tag)} />
      ))}
    </div>
  );
};

export const tagContainerStyle = clsx("flex flex-wrap items-center gap-1");
