/*const List = ({tech}) => {
    console.log(tech)
    const {REACT, ...rest} = tech

    return (
        <>
        <li>{tech}</li>
        </>
    )
}*/
interface Listprops{
    tech : string;
}


//export type Tech = 'REACT' | 'NEXT' | 'VUE' | 'SVELTE' | 'ANGULAR' | 'REACT-NATIVE' ; 




const List = ( props : Listprops ) => {
    return (
        <>
        <li style = {{listStyle : 'none'}}>
            {props.tech === 'REACT' ? '고구마와 함께하는 리액트' : props.tech}
        </li>
        </>
    )
}


export default List