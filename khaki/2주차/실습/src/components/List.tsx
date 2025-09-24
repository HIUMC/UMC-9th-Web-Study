type Tech = 'REACT' | 'NEXT' | 'VUE' | 'SVELTE' | 'ANGULAR' | 'REACT-NATIVE';

interface ListProps{
  tech : Tech;
}

const List = ({tech} : ListProps) => {
  return (
    <li style={{listStyle: 'none', fontSize:'2rem'}}>
      {tech}
    </li>
  )
}

export default List