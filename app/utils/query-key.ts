const AUTH = {
  GET_AUTH: (id: number) => ["auth", id],
};

const PAGE = {
  GET_LIST: ["page", "list"],
  ADD: ["page", "add"],
  UPDATE: ["page", "update"],
  DELETE: ["page", "delete"],
};

const BLOCK = {
  GET_LIST: ["block", "list"],
  ADD: ["block", "add"],
  UPDATE: ["block", "update"],
  DELETE: ["block", "delete"],
};

export const QUERY_KEY = { AUTH, PAGE, BLOCK };
