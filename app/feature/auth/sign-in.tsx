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
import {
    Link,
    redirect
} from "react-router";
import {
    useLoginStore
} from "~/store/useLoginStore";


export default function SignIn(){
  const { signInWithEmail } = useAuth();

  const onSubmit: SubmitHandler<UserSignUp> = async (params) => {
    const data = await signInWithEmail(params);
      const user = useLoginStore.use.login;

      console.log(data,'data')
      if (data.error) {
          alert(data.error)
      }

    if (data.data.user) {

      // redirect('index')
    }
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
            <Link to={'/sign-up'}><button>계정 등록</button></Link>

        </div>
      )}
    />
  );
};
