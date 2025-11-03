import { useCallback, useState } from "react";

export const useBooleanState = (initialState = false) => {
  const [state, setState] = useState(initialState);

  const toTrue = useCallback(() => setState(true), []);
  const toFalse = useCallback(() => setState(false), []);
  const toggle = useCallback(() => setState((prev) => !prev), []);

  return [state, toTrue, toFalse, toggle] as const;
};
