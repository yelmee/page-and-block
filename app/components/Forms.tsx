
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
  children: (method: UseFormReturn<TFieldValues>) => React.ReactNode;
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

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(props.onSubmit)}>
        {props.children(methods)}
      </form>
    </FormProvider>
  );
};

export { Form };
