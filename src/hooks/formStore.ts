import {
  createContext,
  useCallback,
  useContext,
  useRef,
  type RefCallback,
} from "react";

type FieldName = "nickname" | "gender";
type FieldElement = HTMLInputElement | HTMLSelectElement;

type Register = (name: FieldName) => RefCallback<FieldElement>;
export const FormContext = createContext<Register | null>(null);

export const useForm = () => {
  const fields = useRef(new Map<FieldName, FieldElement>());

  const register = useCallback<Register>(
    (name) => (instance) => {
      instance
        ? fields.current.set(name, instance)
        : fields.current.delete(name);
    },
    [],
  );

  const getValues = useCallback(
    () => ({
      nickname: fields.current.get("nickname")?.value,
      gender: fields.current.get("gender")?.value,
    }),
    [],
  );

  return { register, getValues };
};

export const useFormRegister = () => {
  const registerRef = useContext(FormContext);
  if (!registerRef) {
    throw new Error("useFormRegister must be used within a FormContext");
  }
  return registerRef;
};
