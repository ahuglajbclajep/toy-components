import { useState, useCallback, useEffect, useMemo } from "react";

import TagEditor, { narrowDownHelper } from "./TagEditor";
import { TagDisplay } from "./TagDisplay";
import { Tag } from "./types";

const suggestTags = ["v", "w", "x", "y", "z"];

export const Demo = () => {
  const [inputTags, setInputTags] = useState<Tag[]>(["a", "b", "c"]);
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

  return <TagDisplay tags={suggestions} onClickTag={onClickTag} />;
};
