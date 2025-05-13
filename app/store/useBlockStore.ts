import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type {
    Block
} from "~/types/Block";
import {
    addBlock,
    deleteBlocks,
    updateBlockList,
    updateBlocks
} from "~/api/api-block";
import {
    createSelectors
} from "~/store/createSelectors";

type State = {
  editingPageId: number;
  currentPageBlockList: Block<any>[];
  needUpdateBlockList: Block<any>[];
  needDeleteBlockList: number[];
};

type Actions = {
  addBlock: (block: Block<any>) => void;
  deleteBlock: (id: number) => void;
  updateBlocks: () => void;
  updateBlockList: () => void;
  setBlocks: (idx: number, block: Block<any>) => void;
  addNeedUpdateBlockList: (block: Block<any>) => void;
  addNeedDeleteBlockList: (id: number) => void;
};

export const store = create<State & Actions>()(
  immer((setState, getState) => ({
    editingPageId: 0,
    currentPageBlockList: [] as Block<any>[],
    needUpdateBlockList: [] as Block<any>[],
    needDeleteBlockList: [] as number[],
    addBlock: (block) =>
      setState(() => {
        addBlock(block);
        getState().updateBlockList();
      }),
    deleteBlock: (id) =>
      setState(() => {
        getState().needDeleteBlockList.push(id);
        getState().currentPageBlockList =
          getState().currentPageBlockList?.filter((block) => block.id !== id);
      }),
    updateBlocks: () =>
      setState(() => {
        deleteBlocks(getState().needDeleteBlockList);
        updateBlocks(getState().needUpdateBlockList);
        getState().updateBlockList();
      }),
    updateBlockList: () =>
      setState(() => {
        const { data } = updateBlockList(getState().editingPageId);
        getState().currentPageBlockList = data as any;
      }),
    setBlocks: (idx, block) =>
      setState(() => {
        getState().currentPageBlockList[idx] = block;
      }),
    addNeedUpdateBlockList: (block) =>
      setState(() => {
        getState().needUpdateBlockList.push(block);
      }),
    addNeedDeleteBlockList: (id) =>
      setState(() => {
        getState().needDeleteBlockList.push(id);
      }),
  })),
);

export const useBlockStore = createSelectors(store);
