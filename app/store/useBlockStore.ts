import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type {
    Block,
    BlockMapType,
    Title
} from "~/types/Block";
import {
    addBlock,
    deleteBlocks,
    getBlockListInPage,
    updateBlocks
} from "~/api/api-block";
import {
    createSelectors
} from "~/store/createSelectors";

type State = {
  editingPageId: number;
  currentPageBlockList: BlockMapType;
  // needUpdateBlockList: Block[];
  // needDeleteBlockList: number[];
};

type Actions = {
    addBlock: (block: Block) => void;
    addChildBlock: (block: Block) => void;
  deleteBlock: (id: number) => void;
  // updateBlocks: () => void;
  updateBlockList: () => void;
    setBlock: (block: Block, title: Title) => void;
    getBlockByParentId: (id: string | null) => Block[];
  // addNeedUpdateBlockList: (block: Block) => void;
  // addNeedDeleteBlockList: (id: number) => void;
};

export const store = create<State & Actions>()(
  immer((setState, getState) => ({
    editingPageId: 0,
    currentPageBlockList: {} as BlockMapType,
    addBlock: (block) =>
      setState(() => {
        addBlock(block);
        getState().updateBlockList();
      }),
      addChildBlock: (block) =>
          setState(() => {
              addChildBlock(block);
              getState().updateBlockList();
          }),
    deleteBlock: (id) =>
      setState(() => {
        // getState().currentPageBlockList =
          // getState().currentPageBlockList?.filter((block) => block.id !== id);
      }),
    updateBlockList: () =>
      setState(() => {
          const pageId = getState().editingPageId
        const { data } = getBlockListInPage(pageId);
        getState().currentPageBlockList = data as any;
      }),
    setBlock: (block) =>
      setState(() => {
        getState().currentPageBlockList[block.id] = block;
      }),
      getBlockByParentId: (id: string | null) =>
      {
        return Object.values(getState().currentPageBlockList).filter((block)=> block.parent_id === id)

      }
    // addNeedUpdateBlockList: (block) =>
    //   setState(() => {
    //     // getState().needUpdateBlockList.push(block);
    //   }),
    // addNeedDeleteBlockList: (id) =>
    //   setState(() => {
    //     // getState().needDeleteBlockList.push(id);
    //   }),
  })),
);

export const useBlockStore = createSelectors(store);
