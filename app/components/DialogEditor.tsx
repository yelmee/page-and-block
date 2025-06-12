import Icon
    from "~/components/Icon";
import BlockTextInput
    from "~/components/BlockTextInput";

type EditorProps = {

}

type ContentType = {
    text: string
    type: string
}

const itemTypeList: ContentType[] = [
    {text: '제목1', type:'title1'},
    {text: '제목2', type:'title2'},
    {text: '제목3', type:'title3'},
    {text: '글머리 목록', type:'dot_list'},
    {text: '번호 목록', type:'num_list'},
    {text: '할일 목록', type:'todo_list'},
    {text: '토글 목록', type:'toggle_list'},
    {text: '페이지', type:'page'},
]

export default function DialogEditor(props: EditorProps) {

    return (
        <div className='item'>
            <Icon
                className="item-hover:visible invisible"
                onClick={openPageEditModal}
                name={"add"}/>
            <dialog className='bg-white rounded-b-lg shadow-gray-400'>
                <ul>
                    {
                        itemTypeList.length > 0  && itemTypeList.map(item =>
                        (
                            <li className='hover:bg-gray-300'
                                onClick={()=>handleItemClick(item.type)}>{item.text}</li>

                        )
                    )}
                </ul>
            </dialog>
        </div>
    )
};

const openPageEditModal = () => {

}

const handleItemClick = (type: string) => {

}