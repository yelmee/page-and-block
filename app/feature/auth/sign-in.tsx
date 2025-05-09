import {
    useAuth
} from "~/lib/auth";
import type {
    SubmitHandler
} from "react-hook-form";
import {
    type UserSignUp,
    UserSignUpFormSchema
} from "~/types/Auth";
import React
    from "react";
import {
    InputWithLabel
} from "~/components/InputWithLabel";
import {
    Form
} from "~/components/Forms";


export const SignIp = () => {
  const { session } = useAuth();
  const { signInWithEmail } = useAuth();

  if (session) {
    return <div> 리턴 마이페이지</div>;
  }

  const onSubmit: SubmitHandler<UserSignUp> = async (params) => {
    const data = await signInWithEmail(params);

    if (data.user) {
      console.log("리턴 메인페이지");
    }
    // if (error) {
    //   console.log("리턴 에러페이지");
    // }
  };

  return (
    <Form
      schema={UserSignUpFormSchema}
      onSubmit={onSubmit}
      children={({ register, formState }) => (
        <div>
          <h2>계정 추가</h2>
          <InputWithLabel label="email" register={register} required />
          {formState.errors?.email?.message && (
            <p>{formState.errors.email.message}</p>
          )}
          <InputWithLabel label="password" register={register} required />
          {formState.errors?.password?.message && (
            <p>{formState.errors.password.message}</p>
          )}
          <button type="submit">계속</button>
        </div>
      )}
    />
  );
};
