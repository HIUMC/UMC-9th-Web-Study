interface Buttonprops {
    onClick?: () => void;
    text : string
}

const Button = ({onClick,text}:Buttonprops)=> {
    return <button onClick={onClick}>{text}</button>
}

export default Button;