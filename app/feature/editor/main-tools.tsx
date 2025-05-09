import {
    usePageStore
} from "~/store/usePageStore";
import {
    useLoginStore
} from "~/store/useLoginStore";
import TextWithIcon
    from "~/components/TextWithIcon";
import DrawerListItem
    from "~/components/DrawerListItem";

export default function MainTools() {
  const pageList = usePageStore.use.pageList();
  const user = useLoginStore.use.user;

  if (pageList) {
    return (
      <div className="sidebar">
        <h2>Sidebar</h2>
        <TextWithIcon
          name={user.name + " 의 프로젝트"}
          char={user.name.charAt(0)}
        />
        <DrawerListItem isOpen={true} title={"개인 페이지"} />;
        {pageList.map((project) => {
          return <DrawerListItem isOpen={true} title={project.title} />;
        })}
      </div>
    );
  }
}
