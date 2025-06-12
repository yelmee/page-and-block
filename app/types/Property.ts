export type BlockType = {
  text: string;
  checked: boolean;
  to_do: string[];
};

export type Property<E extends Pick<BlockType, any>, T extends keyof E> = {
  type: T;
  title: E
};
