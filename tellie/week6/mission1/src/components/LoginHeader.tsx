import { useNavigate } from 'react-router-dom';

const LoginHeader = () => {
    const navigate = useNavigate();

    return (
        <header className='fixed top-0 w-full bg-black shadow-lg border-b border-gray-800 z-10'>
            <div className='max-w-7xl mx-auto flex justify-between items-center h-16 px-4'>
                <h1 className='text-3xl font-extrabold text-pink-500'
                onClick={() => navigate('/')}>돌려돌려LP판</h1>
                <div className='flex space-x-4'>
                    <button
                        className='px-4 py-2 text-white border border-gray-700 rounded-md hover:bg-gray-800' 
                        onClick={() => navigate('/my')}>
                        마이페이지
                    </button>
                    <button 
                        className='px-4 py-2 text-white border border-gray-700 rounded-md hover:bg-gray-800' 
                        onClick={() => navigate('/login')}>
                        로그인
                    </button>
                    <button 
                        className='px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700' 
                        onClick={() => navigate('/signup')}>
                        회원가입
                    </button>
                </div>
            </div>
        </header>
    );
};


<nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full">
            <div className="flex items-center justify-between p-4">
                <Link
                to="/"
                className="text-xl font-bold text-gray-900 dark:text-white"
                >
                    SpinningSpinning Dolimpan
                </Link>
                <div className="space-x-6">
                    {!accessToken && (
                        <>
                            <Link
                                to={"/login"}
                                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
                            >
                                로그인
                            </Link>
                            <Link
                                to={"/signup"}
                                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
                            >
                                회원가입
                            </Link>
                        </>
                    )}
                    {accessToken && (
                        <>
                            <Link
                                to={"/my"}
                                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
                            >
                                마이 페이지
                            </Link>
                            <Link
                                to={"/search"}
                                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
                            >
                                검색
                            </Link>
export default LoginHeader;