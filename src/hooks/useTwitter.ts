import { useEffect, useMemo, useRef } from "react";

import { useBooleanState } from "./useBooleanState";

/**
 * 必要なら twitter の widgets.js をロードし、window.twttr を返すフック
 *
 * @example
 * const twttr = useTwitter()
 * useEffect(() => {
 *   ref.current && twttr?.widgets.load(ref.current)
 * }, [twttr])
 *
 * @example
 * const twttr = useTwitter()
 * useEffect(() => {
 *   ref.current && twttr?.widgets.createTweet("id", ref.current)
 * }, [twttr])
 *
 * @see https://developer.twitter.com/en/docs/twitter-for-websites/javascript-api/guides/set-up-twitter-for-websites
 */
export const useTwitter = () => {
  const [isLoaded, setIsLoaded] = useBooleanState(!!window.twttr);
  const twttr = useMemo(
    () => (isLoaded ? (window.twttr as Twitter) : undefined),
    [isLoaded],
  );

  useEffect(() => {
    if (!isLoaded) {
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://platform.twitter.com/widgets.js";
      script.addEventListener("load", () => window.twttr.ready(setIsLoaded));
      document.body.appendChild(script);
      return () => void document.body.removeChild(script);
    }
  }, [isLoaded, setIsLoaded]);

  return twttr;
};

/**
 * 埋め込みの描画が完了したかを返すフック
 */
export const useIsEmbedRendered = (
  ref: React.RefObject<HTMLElement | null>,
) => {
  const [isRendered, toTrue] = useBooleanState();

  const isInitialized = useRef(false);
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      // 初回の呼び出しは無視する
      if (!isInitialized.current) {
        isInitialized.current = true;
        return;
      }
      entries.forEach(toTrue);
    });
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, toTrue]);

  return isRendered;
};
