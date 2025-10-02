import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

const Homepage = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default Homepage;