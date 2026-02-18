import { useCallback, useEffect, useState, useRef } from "react";

type Options = {
  once?: boolean;
  initalState?: boolean;
};

export default function useIntersection<T extends HTMLElement = HTMLDivElement>(
  options: Options = {},
  observerOptions: IntersectionObserverInit = {},
) {
  const { once = false, initalState = false } = options;
  const { root = null, rootMargin = "0px", threshold = 0 } = observerOptions;

  const targetRef = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(initalState);

  const intersectionCallback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        setIsIntersecting(entry.isIntersecting);

        // NOTE: once が真なら1回限りで監視をやめる
        if (entry.isIntersecting && once) {
          observer.disconnect();
        }
      });
    },
    [once],
  );

  useEffect(() => {
    if (!targetRef.current) {
      return;
    }

    // NOTE: 無駄に useEffect のクリーンアップ関数が呼ばれないように、ここでオブジェクトを作る
    const observerOptions = { root, rootMargin, threshold };
    const observer = new IntersectionObserver(
      intersectionCallback,
      observerOptions,
    );
    observer.observe(targetRef.current);
    return () => {
      observer.disconnect();
    };
  }, [intersectionCallback, root, rootMargin, threshold]);

  return [targetRef, isIntersecting] as const;
}
