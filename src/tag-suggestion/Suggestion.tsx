import { useState, useCallback, useEffect, useMemo } from "react";

import { ColorTag, tagContainerStyle } from "./Tag";
import { narrowDownHelper } from "./TagEditor";
import { Tag } from "./types";

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
    <div className="max-h-[60px] overflow-y-scroll rounded-md border border-t-0 border-gray-500 bg-gray-100 p-1">
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
