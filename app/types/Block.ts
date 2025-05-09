import type {
  BlockType,
  Property
} from "~/types/Property";

export type Block<Type extends keyof BlockType> = {
  id: number;
  parent_id: number;
  page_id: number;
  properties: Property<Type>;
  content: Block<any>[];
  created_at: string;
  created_by: string;
};

export type UpdateBlockParam = Pick<Block<any>, "id" | "properties">;
