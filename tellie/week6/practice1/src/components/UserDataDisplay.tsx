import { useState } from 'react';
import { useCustomFetch } from '../hooks/useCustomFetch';

interface WelcomeData {
  id: number;
  name: string;
  email: string;
}

// 재시도 로직: 
// 11번 유저 -> 실패 (데이터 없음)
// ~0.1초 지남
// 11번 유저 가입
// 11번 유저 -> 성공 (데이터 있음)

export const WelcomeData = () => {
  const [userId, setUserId] = useState<number>(1);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const handleChangeUser = () => {
    const randomId = Math.floor(Math.random() * 10) + 1;
    setUserId(randomId);
  };

  const handleTestRetry = () => {
    setUserId(999999);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-5">
      <div className="fixed top-0 right-0 p-5 flex gap-2.5 flex-wrap z-10">
        <button onClick={handleChangeUser}
        className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
        >
          다른 사용자 불러오기
        </button>
        <button onClick={() => setIsVisible(!isVisible)}
        className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
        >
          컴포넌트 토글 (언마운트 테스트)
        </button>
        <button
          onClick={handleTestRetry}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
        >
          재시도 테스트 (404 에러)
        </button>
      </div>

      {isVisible && <UserDataDisplay userId={userId} />}
    </div>
  );
};

const UserDataDisplay = ({ userId }: { userId: number }) => {
  const { data, isPending, isError } = useCustomFetch<WelcomeData>(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );

  if (isPending) {
    return <div className="flex items-center justify-center min-h-screen text-white text-xl"
    >Loading... (User ID: {userId})</div>;
  }

  if (isError) {
    return <div className="flex items-center justify-center min-h-screen text-red-400 text-xl"
    >Error Occurred</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen text-center">
      <div>
        <h1 className="text-6xl font-bold text-white mb-5">{data?.name}</h1>
        <p className="text-xl text-gray-400 mb-2.5">{data?.email}</p>
        <p className="text-xs text-gray-600">User ID: {data?.id}</p>
      </div>
    </div>
  );
};