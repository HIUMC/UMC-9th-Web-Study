import { useContext } from 'react'
import './App.css'
import ButtonGroup from './components/ButtonGroup'
import { CounterContext, useCount } from './context/CounterProvider'

function App() {
  const {count} = useCount()
  console.log(count)

  const context = useContext(CounterContext)

  return (
    <>
      <h1>{context?.count}</h1>
      <ButtonGroup
      />
    </>
  )
}


export default App


/* JSX 문법으로 컴포넌트 만들기
import List, {type Tech} from './components/List'
function App() {
  const nickname = '구디'
  const sweetpotato = '고구마'
  const array = ['REACT', 'NEXT', 'VUE', 'SVELTE', 'ANGULAR', 'REACT-NATIVE'] as const
  return (
    <>
      <strong className='school'>홍익대학교</strong>
      <p style={{color : 'purple', fontWeight : 'bold', fontSize : '3rem'}}>{nickname}/구동현</p>
      <h1>{`${nickname}는 ${sweetpotato} 아이스크림을 좋아합니다.`}</h1>
      <ul>
        {array.map((yaho , idx) => ( 
          // <li key={idx}>{yaho}</li>
          <List key={idx} tech={yaho}/>
        ))}
      </ul>
      
    </>
  )
}
*/
/* useState 실습
function App(){
  const [count, setCount] = useState<number>(0);


  // onClick 함수 분리하기
  const handleIncreaseNumber = () => {
    setCount (count + 1)
  }
  return (
    <>
      <h1>{count}</h1>
      <button onClick={handleIncreaseNumber}>숫자 증가</button>
    </>
  )
}
*/

/* 이전 상태 값을 인자로 받아 업데이트
function App(){
  const [person, setPerson] = useState({
    name : '구동현',
    age : 23,
    nickname : '구디',
    city : ''
  })

  const updateCity = () => {
    setPerson((prevPerson) => ({
      ...prevPerson, city:'서울'
    }))
  }
  
  const increaseAge = () => {
    setPerson((prevPerson) => ({
      ...prevPerson, age : prevPerson.age+1
    }))
  }

  return (
    <>
      <h1>이름: {person.name}</h1>
      <h2>나이: {person.age}</h2>
      <h3>닉네임: {person.nickname}</h3>
      {person.city && <h4>도시: {person.city}</h4>}
      <button onClick={updateCity}>도시 추가</button>
      <button onClick={increaseAge}>나이 증가</button>
    </>
  )

}
*/ 

/* Lazy Initialization
function heavyComputation() : number {
  let result = 0;
  for (let i = 0; i < 1_000_000_000; i++){
    result += i++;
  }
  return result;
}

function App() {
  const[count, setCount] = useState(() => heavyComputation());

  const handleIncrease = () => {
    setCount((prev)=>prev+1);
  }

  return (
    <>
      <h3>{count}</h3>
      <button onClick={handleIncrease}>증가</button> // 업데이트 완전 느림
    </>
  )
}

*/


