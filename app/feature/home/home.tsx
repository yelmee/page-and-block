import MainEditor
  from "~/feature/editor/main-editor";
import MainTools
  from "~/feature/editor/main-tools";

//
// export function meta({}: Route.MetaArgs) {
//   return [
//     { title: "New React Router App" },
//     { name: "description", content: "Welcome to React Router!" },
//   ];
// }

export default function Home() {
  return <div>
    <MainTools/>
    <MainEditor/></div>
}
