import { Link, NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import useLogout from "../hooks/mutations/useLogout";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { HambergerButton } from "./HamburgerButton";

interface NavbarProps {
    isOpen: boolean;
    onToggle: () => void;
}

const Navbar = ({ isOpen, onToggle }: NavbarProps) => {

    const { accessToken} = useAuth();
    const navigate = useNavigate();

    const {mutate : logoutMutate} = useLogout();

    const {data} = useGetMyInfo(accessToken);

    const handleLogout = async () => {
        logoutMutate();
        navigate('/');
    }

    const LINKS = [
        { to: '/login', label: '로그인' },
        { to: '/signup', label: '회원가입' },
    ];



    return (
        <nav className="flex justify-between items-center bg-fuchsia-200 fixed w-full h-20 z-50">
            <div className="flex ml-5 items-center justify-between gap-3 ">
                <HambergerButton isOpen={isOpen} onClick={onToggle}/>
                <Link to='/' className="text-3xl font-bold text-gray-700 p-4 hover:text-black">Goody</Link>
            </div>
            {!accessToken && (
                <div className="gap-7 mr-6 flex justify-center items-center">
                    {LINKS.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className="flex text-gray-400 font-bold cursor-pointer hover:text-black"
                        >
                            {label}
                        </NavLink>
                    ))}
                </div>
            )}
            {accessToken && (
                <div className="gap-7 mr-6 flex justify-center items-center">
                    <div>{data?.data?.name}님 반갑습니다.</div>
                    <button
                        className="cursor-pointer bg-gray-300 rounded-sm p-3 hover:scale-90"
                        onClick={handleLogout}
                    >
                        로그아웃
                    </button>
                </div>
            )}

        </nav>
    )
}

export default Navbar
