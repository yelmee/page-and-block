import {
    usePageStore
} from "~/store/usePageStore";
import {
    useBlockStore
} from "~/store/useBlockStore";

import BlockTextInput
    from "~/components/BlockTextInput";


export default function MainEditor() {
  const editingPage = usePageStore.use.editingPage();
  const blockList = useBlockStore().use.currentPageBlockList();
  const needUpdateBlockList = useBlockStore().use.needUpdateBlockList();

  return (
    <div className="editor-container">
      <input className={"page_title"} type="text">
        {editingPage ? editingPage.title : ""}
      </input>

      {blockList.map((block, idx) => (
        <>
          <BlockTextInput
            block={block}
            handleInputEvent={(inputValue) => {
              blockList[idx] = inputValue;
            }}
            addNeedUpdateBlockList={(blockId) => {
              needUpdateBlockList.push(blockId);
            }}
          />
        </>
      ))}
    </div>
  );
}
