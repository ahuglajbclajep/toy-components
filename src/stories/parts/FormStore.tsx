import { useState, useCallback } from "react";
import clsx from "clsx/lite";

import {
  FormStore as FormStoreBase,
  createFormStore,
} from "../../hooks/createFormStore";
import { textInputStyle, buttonStyle } from "../../utils";

type SearchFormData = {
  category: string;
  keyword: string;
};

class SearchormStore extends FormStoreBase<
  SearchFormData,
  keyof SearchFormData,
  HTMLInputElement | HTMLSelectElement
> {
  validate() {
    return {
      keyword: !this.fields.get("keyword")?.value && "Keyword is required.",
    };
  }

  getValues() {
    return {
      category: this.fields.get("category")?.value ?? "",
      keyword: this.fields.get("keyword")?.value ?? "",
    };
  }
}
const { FormProvider, useForm, useField } = createFormStore(SearchormStore);

export const FormStore = () => {
  return (
    <FormProvider>
      <FormStoreInner />
    </FormProvider>
  );
};

const FormStoreInner = () => {
  const [values, setValues] = useState<SearchFormData | null>(null);

  const { trigger, getValues } = useForm();
  const onSearch = useCallback(() => {
    if (trigger()) {
      setValues(getValues());
    }
  }, [getValues]);

  const [categoryRef] = useField("category");
  const [keywordRef, keywordError, setKeywordError] = useField("keyword");
  const onChangeKeyword = useCallback(() => {
    if (!keywordError) {
      return;
    }
    setKeywordError(false);
  }, [keywordError, setKeywordError]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-start gap-2">
        <select className={textInputStyle} defaultValue="all" ref={categoryRef}>
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="books">Books</option>
          <option value="clothing">Clothing</option>
        </select>
        <div className="flex flex-col gap-1">
          <input
            type="text"
            className={textInputStyle}
            placeholder="Search products..."
            ref={keywordRef}
            onChange={onChangeKeyword}
          />
          {keywordError && <span className="text-danger">{keywordError}</span>}
        </div>
        <button
          disabled={!!keywordError}
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
