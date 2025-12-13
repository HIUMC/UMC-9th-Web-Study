// props에 전달되는 값이 동일하다면 함수의 값에 캐싱하여 컴포넌트는 리렌더링되지 않는다.
// memo를 사용하여 CountButton 컴포넌트를 감싸면, props가 변경되지 않는 한 불필요한 컴포넌트의 리렌더링을 방지할 수 있다.
// 주의할 점: 값은 같을 경우에 리렌더링을 안해 주지만, 참조가 넘어온다면 생긴게 동일하더라도 결국 두 주솟값이 다르므로 리렌더링이 될 수밖에 없다.
// 
import { memo } from 'react';

interface ICountButton {
    onClick: (count: number) => void;
}

const CountButton = ({onClick}: ICountButton) => {
    console.log('CountButton Rendered');
    return (
        <button className='border p-2 rounded-lg'
            onClick={() => onClick(10)}
        >
            카운트 증가
        </button>
    );
};
export default memo(CountButton);


// interface ICountButton {
//     onClick: (count: number) => void;
// }

// const CountButton = ({onClick}: ICountButton) => {
//     console.log('CountButton Rendered');
//     return (
//         <button className='border p-2 rounded-lg'
//             onClick={() => onClick(10)}
//         >
//             카운트 증가
//         </button>
//     );
// };
// export default CountButton;