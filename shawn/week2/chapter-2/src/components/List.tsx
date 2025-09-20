interface ListProps {
  tech: string;
}

const List = ({ tech }: ListProps) => {
  return (
    <>
      <li style={{ listStyle: "none" }}>{tech}</li>
    </>
  );
};

export default List;
