import { useState, useCallback } from "react";
import clsx from "clsx/lite";

import { AutoResizingTextarea } from "../components/AutoResizingTextarea";

import { TagEditor } from "../components/tag-search-input/TagEditor";
import { Suggestion } from "../components/tag-search-input/Suggestion";
import { Tag } from "../components/tag-search-input/types";

import { FormStore, createFormStore } from "../hooks/formStore";
import { textInputStyle, buttonStyle } from "../utils";

export const AutoResizingTextarea_ = () => {
  return <AutoResizingTextarea />;
};

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

type SearchFormData = {
  category: string;
  keyword: string;
};

class SearchormStore extends FormStore<
  SearchFormData,
  keyof SearchFormData,
  HTMLInputElement | HTMLSelectElement
> {
  getValues() {
    return {
      category: this.fields.get("category")?.value ?? "",
      keyword: this.fields.get("keyword")?.value ?? "",
    };
  }
}
const { FormProvider, useForm, useField } = createFormStore(SearchormStore);

export const FormStore_ = () => {
  return (
    <FormProvider>
      <FormStoreInner />
    </FormProvider>
  );
};

const FormStoreInner = () => {
  const [values, setValues] = useState<SearchFormData | null>(null);

  const getValues = useForm();
  const onSearch = useCallback(() => {
    setValues(getValues());
  }, [getValues]);

  const register = useField();
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        <select
          className={textInputStyle}
          defaultValue="all"
          ref={register("category")}
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="books">Books</option>
          <option value="clothing">Clothing</option>
        </select>
        <input
          type="text"
          className={textInputStyle}
          placeholder="Search products..."
          ref={register("keyword")}
        />
        <button
          onClick={onSearch}
          className={clsx(buttonStyle, "flex items-center gap-1")}
        >
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="7" cy="7" r="5" />
            <path d="m11 11 4 4" />
          </svg>
          Search
        </button>
      </div>
      <span className="break-all">{`values: ${values ? JSON.stringify(values) : ""}`}</span>
    </div>
  );
};
