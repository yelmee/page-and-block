
import Icon
    from "~/components/Icon";
import Modal
    from "~/components/Modal";
import Text
    from "~/components/Text";

export default function DrawerListItem(props: {
  title: string;
  isOpen: boolean;
}) {
  return (
    <div className="flex justify-between h-1">
        <Text text={props.title} />
        <div
            className={"flex "}>
            <Icon
                onClick={openPageSettingModal}
                name={"more_horiz"}/>
            <Icon
                onClick={openPageEditModal}
                name={"add"}/>
        </div>
    </div>
  );
}

const openPageEditModal = () => {
    return (
        <Modal domNode={document.body}>
      <div></div>
    </Modal>
  );
};

const openPageSettingModal = () => {
  return (
    <Modal domNode={document.body}>
      <div></div>
    </Modal>
  );
};
