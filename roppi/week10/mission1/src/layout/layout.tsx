import { Outlet } from "react-router-dom";
import Header from "../component/Header";

const RootLayout = () => {
  return(
    
    
    <div className="calc(100%-20px) " >
      <Header />
      <Outlet />
    </div>
  )
}

export default RootLayout;  