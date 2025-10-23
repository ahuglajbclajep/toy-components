import { useState, useCallback, useEffect, useMemo } from "react";
import clsx from "clsx/lite";

import { ColorTag, tagContainerStyle } from "./Tag";
import { narrowDownHelper } from "./TagEditor";
import { Tag } from "./types";
import { inputStyle } from "../utils";

type Props = {
  suggestTags: Tag[];
  inputTags: Tag[];
  searchText: string;
  onClickTag: (tag: Tag) => void;
};

export const Suggestion = ({
  suggestTags,
  inputTags,
  searchText,
  onClickTag,
}: Props) => {
  const [suggestions, setSuggestions] = useState<Tag[]>([]);

  const filteredSuggestions = useMemo(
    () => suggestTags.filter((tag) => !inputTags.includes(tag)),
    [inputTags, suggestTags],
  );

  useEffect(() => {
    const narrowDownedSuggestions = filteredSuggestions.filter(
      narrowDownHelper(searchText),
    );
    setSuggestions(narrowDownedSuggestions);
  }, [searchText, filteredSuggestions]);

  if (!suggestions.length) {
    return null;
  }

  return (
    <div
      className={clsx(
        inputStyle,
        "max-h-[60px] cursor-default! overflow-y-scroll border-t-0 focus-within:outline-0",
      )}
    >
      <TagDisplay tags={suggestions} onClickTag={onClickTag} />
    </div>
  );
};

type TagDisplayProps = {
  tags: Tag[];
  onClickTag: (tag: Tag) => void;
};

const TagDisplay = ({ tags, onClickTag }: TagDisplayProps) => {
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
