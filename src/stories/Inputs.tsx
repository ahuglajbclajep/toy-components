import { useState, useCallback } from "react";

import { TagEditor } from "../components/tag-search-input/TagEditor";
import { Suggestion } from "../components/tag-search-input/Suggestion";
import { Tag } from "../components/tag-search-input/types";

export { AutoResizingTextarea } from "../components/AutoResizingTextarea";
export { FormStore } from "./parts/FormStore";

const suggestTags = ["Assembly", "BASIC", "C++", "Dart", "Elixir", "F#", "Go"];

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
