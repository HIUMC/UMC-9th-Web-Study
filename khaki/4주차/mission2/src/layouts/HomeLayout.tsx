import { Outlet } from 'react-router-dom'

const HomeLayout = () => {
  return (
    // 공통 레이아웃을 배치하는 방법
    <div className='h-dvh flex flex-col '> 
      <nav>네비게이션바</nav>
      <main className='flex-1'>
        <Outlet/>
      </main>
      <footer>푸터</footer>
    </div>
  )
}

export default HomeLayout
