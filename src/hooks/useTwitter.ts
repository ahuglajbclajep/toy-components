import { useEffect, useRef, useState } from "react";

import { useBooleanState } from "./useBooleanState";

/**
 * X の widgets.js のロードを管理するクラス
 * script タグが複数作られたり、アンマウント後にコールバックが呼ばれるのを防ぐ
 *
 * @see https://docs.x.com/x-for-websites/javascript-api/guides/set-up-x-for-websites
 */
class TwttrLoader {
  private static twttrPromise: Promise<Twitter> | undefined;

  /**
   * Promise が解決済みなら、解決済みの値への同期的なアクセスを許すためのプロパティ
   */
  public static resolvedTwttr: Awaited<typeof TwttrLoader.twttrPromise>;

  private destroyed: boolean = false;

  public load(onSuccess: (twttr: Twitter) => void) {
    // Promise が空だったら作っておく
    if (!TwttrLoader.twttrPromise) {
      TwttrLoader.twttrPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://platform.x.com/widgets.js";
        script.async = true;
        script.onload = () => {
          window.twttr.ready((twttr) => {
            TwttrLoader.resolvedTwttr = twttr;
            resolve(twttr);
          });
        };
        document.body.appendChild(script);
      });
    }

    // 共有の Promise にコールバックを登録して、解決がブロードキャストされるようにする
    // ただし、destroy() されたインスタンスではコールバックを呼ばない
    void TwttrLoader.twttrPromise.then((twttr) => {
      if (!this.destroyed) {
        onSuccess(twttr);
      }
    });
  }

  public destroy() {
    this.destroyed = true;
  }
}

/**
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
 */
export const useTwitter = () => {
  // 初期値が取得できるときは取得することで、描画までのタイミングを短縮できる
  const [twttr, setTwttr] = useState(TwttrLoader.resolvedTwttr);

  useEffect(() => {
    if (twttr) {
      return;
    }

    const loader = new TwttrLoader();
    loader.load(setTwttr);
    return () => loader.destroy();
  }, [twttr]);

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
