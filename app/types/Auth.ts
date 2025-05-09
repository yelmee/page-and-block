import * as z from "zod";
import type {
  FieldValues,
  Path,
  UseFormRegister
} from "react-hook-form";


interface UserSignUp {
  email: string;
  password: string;
}

type InputProps<T extends FieldValues> = {
  label: Path<T>;
  register: UseFormRegister<T>;
  required: boolean;
};

const UserSignUpFormSchema = z.object({
  email: z.string().email({ message: "이메일 양식이 아님" }),
  // password: z.string().regex(),
});

// type UserSignUpFormSchema = z.infer<typeof UserSignUpFormSchema>;

export type { InputProps, UserSignUp };
export { UserSignUpFormSchema };
