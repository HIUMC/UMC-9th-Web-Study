import LoginHeader from "../components/LoginHeader"

const HomePage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-black text-white'>
      <LoginHeader />
      <h2>홈페이지에 오신 것을 환영합니다.</h2>
    </div>
  )

}

export default HomePage;
