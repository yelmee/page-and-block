import type {
    Block
} from "~/types/Block";
import React, {
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
  handleInputEvent: (inputValue: string) => void;
  // addNeedUpdateBlockList: (block: Block<any>) => void;
};

export default function BlockTextInput(props: PropsBlockTextInput) {
  const block = useRef<Block<any>>(props.block);
  const needUpdateBlockList = useBlockStore.use.needUpdateBlockList();
  const addBlock =  useBlockStore.use.addBlock();

    const handleItemClick = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === KEY_EVENT.TAB) {
            addBlock(block.current);
        }

        if (e.key === KEY_EVENT.ENTER) {
            addBlock(block.current);
        }
    }

  return (
    <>
      <textarea
        onChange={(e) => {
          props.handleInputEvent(e.target.value);
        }}
        onKeyDown={handleItemClick}
        value={block.current?.properties.title}
        className='bg-transparent font-black text-sm'
        id='content'
        name='content'
        cols={30}
        rows={1}/>

        {/*<-- child part -->*/}
      {block.current.content.length > 0
        && block.current.content.map((content, idx) => (
            <BlockTextInput
              block={content}
              handleInputEvent={(inputValue) => {
                block.current.content[idx].properties.title = inputValue;
                  // needUpdateBlockList.push(idx);
              }}
              // addNeedUpdateBlockList={(blockId) => {
              //   needUpdateBlockList.push(blockId);
              // }}
            />
          ))
        }
    </>
  );

}
