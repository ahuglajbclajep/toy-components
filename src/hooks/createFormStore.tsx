import {
  createContext,
  useContext,
  type RefCallback,
  useState,
  useSyncExternalStore,
} from "react";

type FieldName<DefaultValues> = string & keyof DefaultValues;
// DefaultValues の型を、FieldName に対して FieldElement も指定するよう変える方針もあるが、困ってないので今はこれで
type FieldElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

/**
 * @template DefaultValues - フォームの状態
 * @template IncomingValues - 外部から渡されるデータ。defaultValues で DefaultValues に変換できる
 * @template OutgoingValues - 外部に渡すデータ
 */
export abstract class FormStore<
  DefaultValues extends Record<string, unknown>,
  IncomingValues,
  OutgoingValues,
> {
  protected fields = new Map<FieldName<DefaultValues>, FieldElement>();
  register =
    (name: FieldName<DefaultValues>): RefCallback<FieldElement> =>
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
  errorMessages: Partial<Record<FieldName<DefaultValues>, string | false>> = {};
  trigger = (options: { noMessages?: boolean } = {}): boolean => {
    const { noMessages = false } = options;
    const errorMessages = this.validate();
    if (!noMessages) {
      this.errorMessages = errorMessages;
      this.listeners.forEach((listener) => listener());
    }
    // エラーメッセージが空文字の場合も valid とみなす
    return !Object.values(this.errorMessages).some(Boolean);
  };
  setError = (
    name: FieldName<DefaultValues>,
    message: (typeof this.errorMessages)[FieldName<DefaultValues>],
  ) => {
    this.errorMessages[name] = message;
    this.listeners.forEach((listener) => listener());
  };

  constructor(protected incoming?: IncomingValues) {}
  abstract defaultValues: DefaultValues;
  abstract validate(): typeof this.errorMessages;
  abstract getValues(): OutgoingValues;
}

/**
 * @example
 * class MyFormStore extends FormStore<...> { ... }
 * const { FormProvider, useField, useForm } = createFormStore(MyFormStore);
 *
 * const App = () => <FormProvider><Component /></FormProvider>;
 * const Component = () => {
 *   const { trigger, getValues } = useForm();
 *   const handleSubmit = () => {
 *     if (trigger()) {
 *       console.log(getValues());
 *     }
 *   };
 *
 *   const [nameRef, , nameError] = useField("name");
 *   return <><input ref={nameRef} />{nameError && <p>{nameError}</p>}</>;
 * };
 */
export const createFormStore = <
  DefaultValues extends Record<string, unknown>,
  IncomingValues,
  OutgoingValues,
>(
  // SSR 環境で1つのインスタンスを共有することになるのを防ぐため、コンストラクタを受け取る
  formStoreClass: new (
    incoming?: IncomingValues,
  ) => FormStore<DefaultValues, IncomingValues, OutgoingValues>,
) => {
  const FormContext = createContext<FormStore<
    DefaultValues,
    IncomingValues,
    OutgoingValues
  > | null>(null);

  const FormProvider = ({
    children,
    incoming,
  }: {
    children: React.ReactNode;
    incoming?: IncomingValues;
  }) => {
    // useMemo でも動くが、永続化される保証がないので useState を使う
    const [formStore] = useState(() => new formStoreClass(incoming));
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

  const useField = <Name extends FieldName<DefaultValues>>(name: Name) => {
    const store = useStore();
    const errorMessage = useSyncExternalStore(
      store.subscribe,
      () => store.errorMessages[name],
      () => store.errorMessages[name],
    );
    const setErrorMessage = (message: Parameters<typeof store.setError>[1]) =>
      store.setError(name, message);
    return [
      store.register(name),
      store.defaultValues[name],
      errorMessage,
      setErrorMessage,
    ] as const;
  };

  return { FormProvider, useForm, useField };
};
