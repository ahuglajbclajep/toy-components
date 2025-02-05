import React, { useState, useCallback, useEffect, useRef, useId } from "react";
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

  const containerId = useId();
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("#" + CSS.escape(containerId))) {
        setInputMode("editable");
      }
    };
    window.addEventListener("click", listener);
    return () => window.removeEventListener("click", listener);
  }, []);

  const searchInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputMode === "editing" && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [inputMode]);

  const onClickInputTag_ = useCallback(
    (tag: Tag) => (e: React.MouseEvent) => {
      if (inputMode === "editing") {
        // NOTE: 自分自身が消えて closest の判定がおかしくなるのを、イベントの伝搬を止めることで防ぐ
        e.stopPropagation();
        onClickInputTag(tag);
      }
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
        id={containerId}
        onClick={onClickContainer}
        className={clsx(tagContainerStyle, inputStyle, "p-1")}
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
          <div className="absolute left-0 top-full z-10 w-full">{children}</div>
        )}
      </div>
    </div>
  );
}

/**
 * @example
 * tags.filter(narrowDownHelper(searchText)
 */
export const narrowDownHelper = (searchText: string) => (tag: Tag) =>
  tag.toLowerCase().includes(searchText.toLowerCase());
