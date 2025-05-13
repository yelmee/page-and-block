import { useEffect, useState } from "react";
import {
  supabase
} from "~/lib/apiClient";
import type {
  Session
} from "@supabase/supabase-js";
import type {
  UserSignUp
} from "~/types/Auth";


export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setSession(session);
      },
    );
    return () => subscription.subscription.unsubscribe();
  }, []);

  const getUser = () => {
    return supabase.auth.getUser();
  };

  const signUpWithPassword = async (user: UserSignUp) => {
    //   const { data, error } = await  supabase.auth.signUp({
    //   email: user.email,
    //   password: user.password,
    //   options: {
    //     emailRedirectTo: 'http://localhost:5173',
    //   },
    // });
    let { data, error } = await supabase.auth.signUp({
      email: 'someone@email.com',
      password: 'SqFDNPxPLtZiRLRUyUie'
    })
      return {data, error}
  };

  const signInWithEmail =  (user: UserSignUp) => {
    return  supabase.auth.signInWithPassword({
      // email: user.email,
      // password: user.password,
      email: 'someone@email.com',
      password: 'SqFDNPxPLtZiRLRUyUie'

    });

  };

  const resetPasswordForEmail = async (new_password: string) => {
    await supabase.auth.resetPasswordForEmail("valid.email@supabase.io", {
      // redirectTo: "https://example.com/account/update-password",
    });

    await supabase.auth.updateUser({ password: new_password });
  };

  const signOut = async () => await supabase.auth.signOut();


  return {
    signUpWithPassword,
    signInWithEmail,
    resetPasswordForEmail,
    signOut,
    session,
    getUser,
  };
};
