import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

const HomeLayout = () => {
  return (
    // 공통 레이아웃을 배치하는 방법
    <div className='bg-black min-h-dvh flex flex-col '> 
      <nav>
        <NavBar/>
      </nav>

      <main className='flex-1 flex justify-center items-center'>
        <Outlet/>
      </main>
      
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default HomeLayout
