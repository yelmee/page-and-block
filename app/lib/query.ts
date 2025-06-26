

// page
import {
    supabase
} from "~/lib/apiClient";


import type {
    QueryData
} from "@supabase/supabase-js";
import type {
    Page
} from "~/types/Page";
import type {
    Block,
    BlockMapType
} from "~/types/Block";

// const user = useLoginStore().user;
const userId = '234';
// project
const getProjectQuery = () => {
  if (!userId) return;
  return supabase
    .from("project")
    .select("*")
    .eq("created_by", userId.toString());
};

const getPageListQuery = (project_id: number) =>
  supabase.from("page").select("*").eq("id", project_id);

const addPageQuery = (project_id: number) =>
  supabase.from("page").insert({
    project_id: project_id,
    created_by: userId,
    title: "",
  });

const updatePageQuery = (data: Page) =>
  supabase.from("page").update({ title: data.title }).eq("id", data.id);

const deletePageQuery = (page_id: number) =>
  supabase.from("page").delete().eq("id", page_id);

// block
const addBlockQuery = (block: Block) =>
  supabase.from("block").insert({
    properties: JSON.stringify({ type: "text", text: "" }),
    created_by: userId,
    page_id: block.page_id,
    content: [],
    parent_id: block.parent_id,
  });

const updateBlocksQuery = (blocks: BlockMapType) =>
  supabase.rpc("bulk_update_blocks", {
    input: JSON.stringify(blocks),
  });

type BlockQuery = QueryData<typeof getBlocksQuery>;

const getBlocksQuery = (pageId: number) =>
  supabase.rpc("get_result", { page_id: pageId });

const deleteBlocksQuery = (block_ids: number[]) =>
  supabase.from("block").delete().in("id", block_ids);

export { addBlockQuery, getBlocksQuery, updateBlocksQuery, deleteBlocksQuery };

export {
  getProjectQuery,
  getPageListQuery,
  addPageQuery,
  updatePageQuery,
  deletePageQuery,
};

export type { BlockQuery };
