import { useQuery } from "@tanstack/react-query";
import {
    QUERY_KEY
} from "~/utils/query-key";
import {
    addBlockQuery,
    deleteBlocksQuery,
    getBlocksQuery,
    updateBlocksQuery
} from "~/lib/query";
import type {
    Block
} from "~/types/Block";


const updateBlocks = (blocks: Block<any>[]) =>
  useQuery({
    queryKey: QUERY_KEY.BLOCK.GET_LIST,
    queryFn: () => updateBlocksQuery(blocks),
  });

const updateBlockList = (pageId: number) =>
  useQuery({
    queryKey: QUERY_KEY.BLOCK.GET_LIST,
    queryFn: () => getBlocksQuery(pageId),
  });

const addBlock = (block: Block<any>) =>
  useQuery({
    queryKey: QUERY_KEY.BLOCK.ADD,
    queryFn: () => addBlockQuery(block),
  });

const deleteBlocks = (pageIds: number[]) =>
  useQuery({
    queryKey: QUERY_KEY.BLOCK.DELETE,
    queryFn: () => deleteBlocksQuery(pageIds),
  });

export { updateBlocks, addBlock, deleteBlocks, updateBlockList };
