import { createContext, useContext, type RefCallback, useState } from "react";

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
    return () => store.getValues();
  };

  const useField = () => {
    const store = useStore();
    return store.register;
  };

  return { FormProvider, useForm, useField };
};
