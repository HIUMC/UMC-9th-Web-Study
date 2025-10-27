import { Link } from "react-router-dom";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <div className="grid grid-cols-3 items-center w-[300px]">
      <Link to={"/"} className="text-xl text-white px-3 py-1 transition">
        {`<`}
      </Link>
      <span className="text-white text-center text-xl">{title}</span>
    </div>
  );
};

export default Header;
