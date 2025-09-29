import { Outlet } from "react-router-dom"
import { Navbar } from "../components/Navbar"

const HomePage = () => {
    return (
        <>  
            <Navbar />
            {/* 자식 요소들을 보려면 outlet 선언 필요 */}
            <Outlet /> 
        </>
    )
}

export default HomePage
