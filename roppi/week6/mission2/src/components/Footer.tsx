import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-gray-500 w-full p-5 flex flex-col items-center">
      <p>&copy; {new Date().getFullYear()} SpinnigSpinnig Dolimpan. All rights reserved.</p>
      <div className="flex gap-4">
        <Link to={"#"}>Privacy Policy</Link>
        <Link to={"#"}>Terms of Service</Link>
        <Link to={"#"}>Contact</Link>
      </div>
    </footer>
  )
};

export default Footer;