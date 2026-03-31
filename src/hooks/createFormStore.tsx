import {
  createContext,
  useContext,
  type RefCallback,
  useState,
  useSyncExternalStore,
} from "react";

type ValueOf<T extends Record<PropertyKey, unknown>> = T[keyof T];

export abstract class FormStore<
  Data,
  FieldName extends string,
  FieldElement extends HTMLElement,
> {
  protected fields = new Map<FieldName, FieldElement>();
  register =
    (name: FieldName): RefCallback<FieldElement> =>
    (instance) => {
      instance && this.fields.set(name, instance);
      // ref callback の cleanup で、アンマウント時にフィールドをリセットする
      return () => void this.fields.delete(name);
    };

  private listeners = new Set<() => void>();
  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => void this.listeners.delete(listener);
  };

  // Map でも書けるが、validate() がオブジェクトを返す設計なのでこの方がシンプル
  // |false は !this.fields.get("name")?.value && "msg" と書けるようにするため
  errorMessages: Partial<Record<FieldName, string | false>> = {};
  trigger = (): boolean => {
    this.errorMessages = this.validate();
    this.listeners.forEach((listener) => listener());
    // エラーメッセージが空文字の場合も valid とみなす
    return !Object.values(this.errorMessages).some(Boolean);
  };
  setError = (name: FieldName, message: ValueOf<typeof this.errorMessages>) => {
    this.errorMessages[name] = message;
    this.listeners.forEach((listener) => listener());
  };

  abstract validate(): typeof this.errorMessages;
  abstract getValues(): Data;
}

/**
 * @example
 * class MyFormStore extends FormStore<...> { ... }
 * const { FormProvider, useField, useForm } = createFormStore(MyFormStore);
 */
export const createFormStore = <
  Data,
  Name extends string,
  Element extends HTMLElement,
>(
  // SSR 環境で1つのインスタンスを共有することになるのを防ぐため、コンストラクタを受け取る
  formStoreClass: new () => FormStore<Data, Name, Element>,
) => {
  const FormContext = createContext<FormStore<Data, Name, Element> | null>(
    null,
  );

  const FormProvider = ({ children }: { children: React.ReactNode }) => {
    // useMemo でも動くが、永続化される保証がないので useState を使う
    const [formStore] = useState(() => new formStoreClass());
    return <FormContext value={formStore}>{children}</FormContext>;
  };

  const useStore = () => {
    const formStore = useContext(FormContext);
    if (!formStore) {
      throw new Error("Form hooks must be used within a FormProvider");
    }
    return formStore;
  };

  const useForm = () => {
    const store = useStore();
    return { trigger: store.trigger, getValues: () => store.getValues() };
  };

  const useField = (name: Name) => {
    const store = useStore();
    const errorMessage = useSyncExternalStore(
      store.subscribe,
      () => store.errorMessages[name],
      () => store.errorMessages[name],
    );
    const setErrorMessage = (message: Parameters<typeof store.setError>[1]) =>
      store.setError(name, message);
    return [store.register(name), errorMessage, setErrorMessage] as const;
  };

  return { FormProvider, useForm, useField };
};
