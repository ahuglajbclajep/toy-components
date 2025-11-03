import { useState, useCallback } from "react";

import { AutoResizingTextarea } from "../components/AutoResizingTextarea";

import { TagEditor } from "../components/tag-search-input/TagEditor";
import { Suggestion } from "../components/tag-search-input/Suggestion";
import { Tag } from "../components/tag-search-input/types";

export const AutoResizingTextarea_ = () => {
  return <AutoResizingTextarea />;
};

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
