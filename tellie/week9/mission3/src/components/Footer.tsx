import { FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8 mt-auto">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-2xl font-bold">Tellie</h2>
                        <p className="text-gray-400 text-sm mt-1">© {new Date().getFullYear()} Tellie. All rights reserved.</p>
                    </div>

                    <div className="flex space-x-6 mb-4 md:mb-0">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a>
                    </div>

                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white text-xl transition-colors">
                            <FaGithub />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white text-xl transition-colors">
                            <FaTwitter />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white text-xl transition-colors">
                            <FaInstagram />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
