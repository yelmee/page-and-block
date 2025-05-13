export default function Icon(props: {
  name: string;
  onClick?: () => void
}) {
  return (
      <span
          onClick={props.onClick}
          className={"material-symbols-outlined size-18"}>
      {props.name}
    </span>
  );
}