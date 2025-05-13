
import React from "react";
import { Schema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type FieldValues,
  FormProvider,
  type SubmitHandler,
  useForm,
  type UseFormProps,
  type UseFormReturn
} from "react-hook-form";

type FormProps<
  TFieldValues extends FieldValues,
  // Schema extends z.Schema<FieldValues, any, any>,
> = {
  children: (method: Pick<UseFormReturn<TFieldValues>, any>) => React.ReactNode;
  onSubmit: SubmitHandler<TFieldValues>;
  schema: Schema;
  options?: UseFormProps<TFieldValues>;
};

// export type UseFormRegister<TFieldValues extends FieldValues> = <
//   TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
// >(
//   name: TFieldName,
// ) => UseFormRegisterReturn<TFieldName>;

const Form = <T extends FieldValues>(props: FormProps<T>) => {
  const methods = useForm<T>({
    resolver: zodResolver(props.schema),
    ...props.options,
  });
  const {register, formState, handleSubmit} = methods
  const parsedMethods = {register, formState, handleSubmit}
  return (
    <FormProvider {...methods}>
      <form onSubmit={parsedMethods.handleSubmit(props.onSubmit)}>
        {props.children(parsedMethods)}
      </form>
    </FormProvider>
  );
};

export { Form };
