import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import type {
    Page
} from "~/types/Page";
import {
    addPage,
    deletePage,
    getPageList,
    updatePage
} from "~/api/api-page";
import {
    createSelectors
} from "~/store/createSelectors";


type State = {
  editingPage: Page;
  pageList: Page[];
};

type Actions = {
  getEditingPage: (pageId: number) => void;
  updatePageList: (projectId: number) => void;
  addPage: (projectId: number) => void;
  updatePage: (page: Page) => void;
  deletePage: (pageId: number) => void;
};
const store = create<State & Actions>()(
  immer((setState, getState) => ({
    pageList: [] as Page[],
    editingPage: {} as Page,
    getEditingPage: (pageId) =>
      setState(() => {
        getState().editingPage = getState().pageList.filter(
          (page) => page.id === pageId,
        )[0] as Page;
      }),
    updatePageList: (projectId) =>
      setState(() => {
        const res = getPageList(projectId);
        getState().pageList = res.data as any;
      }),
    addPage: (projectId) =>
      setState(() => {
        const res = addPage(projectId);
        getState().editingPage = res.data as any;
        getState().updatePageList(projectId);
      }),
    updatePage: (page) =>
      setState(() => {
        const res = updatePage(page);
        getState().editingPage = res.data as any;
      }),
    deletePage: (pageId) =>
      setState(() => {
        deletePage(pageId);
        getState().updatePageList(pageId);
      }),
  })),
);
export const usePageStore = createSelectors(store);
