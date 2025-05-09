
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
    <div className="flex justify-between items-center w-full">
      <div className={"flex items-center"}>
        {/*<Icon v-if={!props.isOpen} name={"description"} />*/}
        <Text text={props.title} />
      </div>
      <div className={"flex"}>
        <Icon onClick={openPageSettingModal} name={"more_horiz"} />
        <Icon onClick={openPageEditModal} name={"add"} />
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
