import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type {
    Project
} from "~/types/Project";
import type {
    User
} from "~/types/User";
import type {
    Session
} from "@supabase/supabase-js";
import {
    supabase
} from "~/lib/apiClient.client";
import {
    updateProject
} from "~/api/api-project";
import {
    createSelectors
} from "~/store/createSelectors";

type State = {
  user: User | null;
  isLogin: boolean;
  session: Session | null;
  project: Project | null;
};

type Actions = {
  login: (session: Session) => void;
  logout: () => void;
  updateUser: () => void;
  updateProject: () => void;
};

export const store = create<State & Actions>()(
  immer((setState, getState) => ({
    isLogin: false,
    session: null,
    user: null,
    project: null,
    login: (session) =>
      setState(() => {
        getState().session = session;
        getState().isLogin = true;
      }),
    logout: () => {
      setState(() => {
        getState().isLogin = true;
      });
    },
    updateUser: () =>
      setState(async () => {
        const data = await supabase.auth.getUser();
        getState().user = data.data.user as any;
      }),
    updateProject: () =>
      setState(() => {
        const { data } = updateProject();
        getState().project = data as any;
      }),
  })),
);
export const useLoginStore = createSelectors(store);
