import { createContext, useContext, type RefCallback } from "react";

type FieldName = "nickname" | "gender";
type FieldElement = HTMLInputElement | HTMLSelectElement;

export const FormContext = createContext<FormStore | null>(null);

export class FormStore {
  private fields = new Map<FieldName, FieldElement>();

  register =
    (name: FieldName): RefCallback<FieldElement> =>
    (instance) => {
      instance ? this.fields.set(name, instance) : this.fields.delete(name);
    };

  getValues = () => {
    return {
      nickname: this.fields.get("nickname")?.value,
      gender: this.fields.get("gender")?.value,
    };
  };
}

export const useFormRegister = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormRegister must be used within a FormContext");
  }
  return context;
};
