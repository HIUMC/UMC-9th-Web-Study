import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6 mt-12">
      <div className="container mx-auto text-center text-gray-600 dark:text-gray-400">
        <p>
          © {new Date().getFullYear()} 돌려돌려 돌림판. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <Link to={"#"}>Privacy Policy</Link>
          <Link to={"#"}>Terms of Service</Link>
          <Link to={"#"}>Contact</Link>
        </div>
      </div>
    </footer>
  );
}
