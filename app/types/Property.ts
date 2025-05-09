export type BlockType = {
  text: string;
  checked: boolean;
  to_do: string[];
};

export type Property<T extends keyof BlockType> = {
  type: T;
} & Pick<BlockType, T>;
