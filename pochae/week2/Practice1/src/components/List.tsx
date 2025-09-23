export type Tech =
  | "REACT"
  | "NEXT"
  | "VUE"
  | "SVELTE"
  | "ANGULAR"
  | "REACT-NATIVE";

interface ListProps {
  tech: Tech;
}

const List = (props: ListProps) => {
  return (
    <li style={{ listStyle: "none" }}>
      {props.tech === "REACT" ? "고구마와 함께하는 리액트" : props.tech}
    </li>
  );
};

export default List;
