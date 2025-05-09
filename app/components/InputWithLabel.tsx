import type {
    FieldValues
} from "react-hook-form";
import type {
    InputProps
} from "~/types/Auth";

const InputWithLabel = <T extends FieldValues>(props: InputProps<T>) => {
  return (
    <>
      <label>{props.label}</label>
      <input {...props.register(props.label, { required: props.required })} />
    </>
  );
};

export { InputWithLabel };
