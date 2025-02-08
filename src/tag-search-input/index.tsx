import { useState, useCallback } from "react";

import { TagEditor } from "./TagEditor";
import { Suggestion } from "./Suggestion";
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

export const TagSearchInput = () => {
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
