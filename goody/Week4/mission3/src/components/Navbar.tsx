import { NavLink } from "react-router-dom"

const Navbar = () => {
    const LINKS = [
    { to: '/login', label : '로그인'},
    { to : '/signup', label : '회원가입'},
    ];

    return (
    <div className="flex flex-row justify-between items-center bg-fuchsia-50 ">
        <div className="flex text-3xl font-bold text-center p-4">Goody</div>
        <div className="flex gap-3 p-4 text-center">
            {LINKS.map(({to, label})  => (
                <NavLink
                    key={to}
                    to={to}
                    className = "flex text-gray-400 w-20 font-bold hover:cursor-pointer "
                >
                    {label}
                </NavLink>
            ))}
                
            </div>
        </div>
    )
}

export default Navbar
