import { useQuery } from "@tanstack/react-query";
import {
    QUERY_KEY
} from "~/utils/query-key";
import {
    getProjectQuery
} from "~/lib/query";


export const updateProject = () =>
  useQuery({
    queryKey: QUERY_KEY.PAGE.GET_LIST,
    queryFn: () => getProjectQuery(),
  });
