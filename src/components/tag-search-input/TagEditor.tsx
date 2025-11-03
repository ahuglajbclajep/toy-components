import React, { useState, useCallback, useEffect, useRef } from "react";
import clsx from "clsx/lite";

import { ColorTag, tagContainerStyle } from "./Tag";
import { Tag } from "./types";
import { inputStyle } from "../../utils";

type Props = {
  inputTags: Tag[];
  onClickInputTag: (tag: Tag) => void;
  searchText: string;
  onChangeSearchText: (text: string) => void;
  children: React.ReactNode;
  placeholder?: string;
};

type InputMode = "editable" | "editing";

/**
 * @example
 * const [inputTags, setInputTags] = useState<Tag[]>([])
 * const [searchText, setSearchText] = useState('')
 * const Suggestion = ...
 *
 * <TagEditor
 *   inputTags={inputTags}
 *   onClickInputTag={removeTagFromInputTags}
 *   searchText={searchText}
 *   onChangeSearchText={setSearchText}
 * >
 *   <Suggestion
 *     inputTags={inputTags}
 *     searchText={searchText}
 *     onClickSuggestTag={addTagToInputTags}
 *   />
 * </TagEditor>
 */
export const TagEditor = ({
  inputTags,
  onClickInputTag,
  searchText,
  onChangeSearchText,
  children,
  placeholder,
}: Props) => {
  const [inputMode, setInputMode] = useState<InputMode>("editable");
  const isEditing = inputMode === "editing";
  const searchInputRef = useRef<HTMLInputElement>(null);

  const onClickContainer = useCallback(() => {
    if (inputMode === "editable") {
      setInputMode("editing");
      return;
    }
    searchInputRef.current?.focus();
  }, [inputMode]);

  const onBlur = useCallback((e: React.FocusEvent<HTMLElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setInputMode("editable");
    }
  }, []);

  useEffect(() => {
    if (inputMode === "editing" && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [inputMode]);

  const onClickInputTag_ = useCallback(
    (tag: Tag) => () => {
      if (inputMode === "editing") {
        onClickInputTag(tag);
      }
      searchInputRef.current?.focus();
    },
    [inputMode, onClickInputTag],
  );

  const onChangeSearchText_ = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChangeSearchText(e.currentTarget.value);
    },
    [onChangeSearchText],
  );

  return (
    // NOTE: children の領域が border 分ずれるのを防ぐため、relative を外側につける
    <div className="relative">
      <div
        onClick={onClickContainer}
        onBlur={onBlur}
        className={clsx(tagContainerStyle, inputStyle, "p-1")}
      >
        {!isEditing && !inputTags.length && (
          <span className="h-6 text-base text-gray-500">{placeholder}</span>
        )}
        {inputTags.map((tag) => (
          <ColorTag
            key={tag}
            tag={tag}
            isEditing={isEditing}
            onClick={onClickInputTag_(tag)}
          />
        ))}
        {isEditing && (
          <input
            ref={searchInputRef}
            type="text"
            // NOTE: tabindex を明示的に指定しないと、Chrome 以外では e.relatedTarget が空になる
            tabIndex={0}
            value={searchText}
            onChange={onChangeSearchText_}
            className="flex-1 resize-none overflow-hidden border-none bg-transparent outline-none"
          />
        )}
        {isEditing && (
          <div className="absolute top-full left-0 z-10 w-full">{children}</div>
        )}
      </div>
    </div>
  );
};

/**
 * @example
 * tags.filter(narrowDownHelper(searchText)
 */
export const narrowDownHelper = (searchText: string) => (tag: Tag) =>
  tag.toLowerCase().includes(searchText.toLowerCase());
