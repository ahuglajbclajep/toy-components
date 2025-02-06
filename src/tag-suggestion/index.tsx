import { useState, useCallback, useEffect, useMemo } from "react";

import TagEditor, { narrowDownHelper } from "./TagEditor";
import { TagDisplay } from "./TagDisplay";
import { Tag } from "./types";

const suggestTags = [
  "Assembly",
  "BASIC",
  "C++",
  "Dart",
  "Elixir",
  "F#",
  "Go",
  "Haskell",
  "Idris",
  "Java",
];

export const Demo = () => {
  const [inputTags, setInputTags] = useState<Tag[]>(suggestTags.slice(0, 3));
  const [searchText, setSearchText] = useState("");

  const onClickInputTag = useCallback((tag: Tag) => {
    setInputTags((prev) => prev.filter((ptag) => ptag !== tag));
  }, []);

  const onClickSuggestTag = useCallback((tag: Tag) => {
    setInputTags((prev) => [...prev, tag]);
    setSearchText("");
  }, []);

  return (
    <TagEditor
      inputTags={inputTags}
      onClickInputTag={onClickInputTag}
      searchText={searchText}
      onChangeSearchText={setSearchText}
    >
      <Suggestion
        suggestTags={suggestTags}
        inputTags={inputTags}
        searchText={searchText}
        onClickTag={onClickSuggestTag}
      />
    </TagEditor>
  );
};

type SuggestionProps = {
  suggestTags: Tag[];
  inputTags: Tag[];
  searchText: string;
  onClickTag: (tag: Tag) => void;
};

const Suggestion = ({
  suggestTags,
  inputTags,
  searchText,
  onClickTag,
}: SuggestionProps) => {
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
