import {
    type SubmitHandler,
    useForm
} from "react-hook-form";
import {
    type UserSignUp,
    UserSignUpFormSchema
} from "~/types/Auth";
import {
    zodResolver
} from "@hookform/resolvers/zod";
import {
    useAuth
} from "~/lib/auth";
import React
    from "react";
import {
    InputWithLabel
} from "~/components/InputWithLabel";


export const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignUp>({
    // resolver: zodResolver(UserSignUpFormSchema),
    defaultValues: { email: "", password: "" },
  });
  const { signUpWithPassword } = useAuth();

  const onSubmit: SubmitHandler<UserSignUp> = (data) => {
    const res = signUpWithPassword(data);
    alert(JSON.stringify(res));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputWithLabel label="email" register={register} required />
      {errors?.email?.message && <p>{errors.email.message}</p>}
      <InputWithLabel label="password" register={register} required />
      {errors?.password?.message && <p>{errors.password.message}</p>}
      <button type="submit" />
    </form>
  );
};
