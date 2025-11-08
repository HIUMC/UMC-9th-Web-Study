import { Link } from "react-router-dom";

const Footer = () => {
  return(
    <footer className="bg-[#323232] py-3 text-gray-200">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} 돌려돌려LP판 All rights reserved.</p>
        <div className="flex justify-center space-x-4 text-sm mt-2">
          <Link to={"#"}>Privacy Policy</Link>
          <Link to={"#"}>Terms of Service</Link>
          <Link to={"#"}>Contact</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer;