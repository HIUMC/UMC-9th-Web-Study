import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar"
const HomePage = () => {
    return (
    <>
        <NavBar />
        <Outlet/>
    </>);
}

export default HomePage;