import Button from './Button'
import {useCount} from '../context/CounterProvider'

const ButtonGroup = () => {
    const {handleIncrease, handleDecrease} = useCount()
    return(
    <div>
        <Button onClick={handleIncrease} text ='+1증가' />
        <Button onClick={handleDecrease} text ='-1감소' />
    </div>
    )
}

export default ButtonGroup;