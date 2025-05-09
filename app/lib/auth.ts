import { useEffect, useState } from "react";
import {
  supabase
} from "~/lib/apiClient.client";
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
    const { data, error } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
      options: {
        emailRedirectTo: import.meta.env.SUPABASE_REDIRECT_URL,
      },
    });

    if (error) throw error;
    return data;
  };

  const signInWithEmail = async (user: UserSignUp) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    });

    if (error) throw error;
    return data;
  };

  const resetPasswordForEmail = async (new_password: string) => {
    await supabase.auth.resetPasswordForEmail("valid.email@supabase.io", {
      redirectTo: "https://example.com/account/update-password",
    });

    await supabase.auth.updateUser({ password: new_password });
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(error);
  };

  return {
    signUpWithPassword,
    signInWithEmail,
    resetPasswordForEmail,
    signOut,
    session,
    getUser,
  };
};
