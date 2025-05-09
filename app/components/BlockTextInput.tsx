import type {
    Block
} from "~/types/Block";
import {
    useRef
} from "react";
import {
    useBlockStore
} from "~/store/useBlockStore";
import {
    KEY_EVENT
} from "~/utils/key-event";


type PropsBlockTextInput = {
  block: Block<any>;
  handleInputEvent: (inputValue: Block<any>) => void;
  addNeedUpdateBlockList: (block: Block<any>) => void;
};
export default function BlockTextInput(props: PropsBlockTextInput) {
  const block = useRef<Block<any>>(props.block);
  const needUpdateBlockList = useBlockStore().use.needUpdateBlockList();
  const addBlock = useBlockStore().use.addBlock();

  return (
    <>
      <input
        onChange={(e) => {
          props.handleInputEvent({
            ...block.current,
            properties: {
              ...block.current?.properties,
              title: e.target.value,
            },
          });
          props.addNeedUpdateBlockList(block.current);
        }}
        value={block.current?.properties.title}
        onKeyDown={(e) => {
          if (e.key === KEY_EVENT.TAB) {
            addBlock(block.current);
          }

          if (e.key === KEY_EVENT.ENTER) {
            addBlock(block.current);
          }
        }}
        className={"block-text-input"}
      >
        {block.current.properties.title}
      </input>
      {block.current.content.length > 0
        ? block.current.content.map((content, idx) => (
            <BlockTextInput
              block={content}
              handleInputEvent={(inputValue) => {
                block.current.content[idx] = inputValue;
              }}
              addNeedUpdateBlockList={(blockId) => {
                needUpdateBlockList.push(blockId);
              }}
            />
          ))
        : null}
    </>
  );
}
