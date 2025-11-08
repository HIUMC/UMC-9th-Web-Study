import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-black py-6">
            <div className="mx-auto text-center text-pink-400">
                <p>
                    &copy; {new Date().getFullYear()}  SpinningSpinning Dolimpan. All
                    rights reserved.
                </p>
                <div className={"flex justify-center space-x-4 mt-4"}>
                    <Link to={"#"} className="hover:text-pink-300 transition-colors">Privacy Policy</Link>
                    <Link to={"#"} className="hover:text-pink-300 transition-colors">Terms of Service</Link>
                    <Link to={"#"} className="hover:text-pink-300 transition-colors">Contact</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;