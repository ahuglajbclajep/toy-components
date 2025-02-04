import React, { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx/lite";

import { ColorTag } from "./Tag";
import { tagContainerStyle } from "./TagDisplay";
import { Tag } from "./types";
import { inputStyle } from "../styles";

type Props = {
  inputTags: Tag[];
  onClickInputTag: (tag: Tag) => void;
  searchText: string;
  onChangeSearchText: (text: string) => void;
  children: React.ReactNode;
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
export default function TagEditor({
  inputTags,
  onClickInputTag,
  searchText,
  onChangeSearchText,
  children,
}: Props) {
  const [inputMode, setInputMode] = useState<InputMode>("editable");
  const isEditing = inputMode === "editing";

  const onClickContainer = useCallback(() => {
    if (inputMode === "editable") {
      setInputMode("editing");
    }
  }, [inputMode]);

  const searchInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputMode === "editing" && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [inputMode]);

  const onClickInputTag_ = useCallback(
    (tag: Tag) => () => {
      onClickInputTag(tag);
    },
    [onClickInputTag],
  );

  const onChangeSearchText_ = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChangeSearchText(e.currentTarget.value);
    },
    [onChangeSearchText],
  );

  return (
    <div
      onClick={onClickContainer}
      className={clsx(tagContainerStyle, inputStyle, "relative flex-grow p-1")}
    >
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
          value={searchText}
          onChange={onChangeSearchText_}
          className="flex-1 resize-none overflow-hidden border-none bg-transparent outline-none"
        />
      )}
      {isEditing && (
        <div
          className={clsx(
            "absolute left-0 top-full z-10 max-h-[50px] w-full overflow-y-scroll",
            "rounded-md border border-gray-500 bg-gray-100 p-1",
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}

/**
 * @example
 * tags.filter(narrowDownHelper(searchText)
 */
export const narrowDownHelper = (searchText: string) => (tag: Tag) =>
  tag.toLowerCase().includes(searchText.toLowerCase());
