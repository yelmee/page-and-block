import {
    usePageStore
} from "~/store/usePageStore";
import {
    useBlockStore
} from "~/store/useBlockStore";

import BlockTextInput
    from "~/components/BlockTextInput";
import {
    parseKeyEvent,
    getCSSStyle
} from "~/utils/parse-block";
import {
    useDebounce
} from "~/hooks/debounce";
import type {
    Block,
    Title
} from "~/types/Block";


export default function MainEditor() {
    const editingPage = usePageStore.use.editingPage();
    const getBlockByParentId = useBlockStore.use.getBlockByParentId();
    const setBlock = (block: Block, title: Title)=> useBlockStore.use.setBlock();


    const sendRealtimeBlockToChannel = () => {
        const debounce = useDebounce(()=> {

        })
    }


    return (
    <div className="editor-container">
      <input className={"page_title"} type="text">
        {editingPage ? editingPage.title : ""}
      </input>
      {
          getBlockByParentId(null).map((block) => (
          <BlockTextInput
            block={block}
            handleInputEvent={(event) => {
               setBlock(block, parseKeyEvent(event.target.value))
            }}
          />
      ))}
    </div>
  );
}
