import { useState, useCallback, useMemo } from "react";

import { AutoResizingTextarea } from "../components/AutoResizingTextarea";

import { TagEditor } from "../components/tag-search-input/TagEditor";
import { Suggestion } from "../components/tag-search-input/Suggestion";
import { Tag } from "../components/tag-search-input/types";

import { FormStore, createFormStore } from "../hooks/formStore";
import { inputStyle } from "../utils";

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

type ExampleFormData = {
  nickname: string;
  gender: string;
};

class ExampleFormStore extends FormStore<
  ExampleFormData,
  keyof ExampleFormData,
  HTMLInputElement | HTMLSelectElement
> {
  getValues() {
    return {
      nickname: this.fields.get("nickname")?.value ?? "",
      gender: this.fields.get("gender")?.value ?? "",
    };
  }
}
const { FormProvider, useForm, useField } = createFormStore(ExampleFormStore);

export const FormStore_ = () => {
  return (
    <FormProvider>
      <FormStoreInner />
    </FormProvider>
  );
};

const FormStoreInner = () => {
  const getValues = useForm();
  const onSubmit = useCallback(() => {
    console.log(getValues());
  }, [getValues]);

  const register = useField();
  return (
    <div className="flex gap-2">
      <input
        type="text"
        className={inputStyle}
        placeholder="Nickname"
        ref={register("nickname")}
      />
      <select className={inputStyle} ref={register("gender")}>
        <option value="" disabled selected>
          Gender
        </option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="unspecified">Unspecified</option>
      </select>
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
};
