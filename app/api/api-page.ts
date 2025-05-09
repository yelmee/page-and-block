import { useQuery } from "@tanstack/react-query";
import {
    QUERY_KEY
} from "~/utils/query-key";
import {
    addPageQuery,
    deletePageQuery,
    getPageListQuery,
    updatePageQuery
} from "~/lib/query";
import type {
    Page
} from "~/types/Page";



const getPageList = (projectId: number) =>
  useQuery({
    queryKey: QUERY_KEY.PAGE.GET_LIST,
    queryFn: () => getPageListQuery(projectId),
  });

const addPage = (projectId: number) =>
  useQuery({
    queryKey: QUERY_KEY.PAGE.ADD,
    queryFn: () => addPageQuery(projectId),
  });

const updatePage = (page: Page) =>
  useQuery({
    queryKey: QUERY_KEY.PAGE.UPDATE,
    queryFn: () => updatePageQuery(page),
  });

const deletePage = (pageId: number) =>
  useQuery({
    queryKey: QUERY_KEY.PAGE.DELETE,
    queryFn: () => deletePageQuery(pageId),
  });

export { getPageList, deletePage, updatePage, addPage };
