import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';
import Logo from './Logo';

const Footer = () => {
    return (
        <footer className="bg-ink text-gray-300 py-12 border-t border-primary-900">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center space-x-2 mb-4 group">
                            <Logo className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
                            <span className="text-xl font-heading font-bold text-white tracking-tight">
                                AstraQuiz
                            </span>
                        </Link>
                        <p className="text-sm leading-6 text-gray-400 mb-6">
                            Calm, secure assessment software for creating tests, guiding attempts, and reading results without noise.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <FiGithub className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <FiTwitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <FiLinkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            <li><Link to="/" className="text-sm hover:text-primary-400 transition">Home</Link></li>
                            <li><Link to="/about" className="text-sm hover:text-primary-400 transition">About Us</Link></li>
                            <li><Link to="/login" className="text-sm hover:text-primary-400 transition">Login</Link></li>
                            <li><Link to="/register" className="text-sm hover:text-primary-400 transition">Register</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Resources</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-sm hover:text-primary-400 transition">Assessment Guide</a></li>
                            <li><a href="#" className="text-sm hover:text-primary-400 transition">Privacy Policy</a></li>
                            <li><a href="#" className="text-sm hover:text-primary-400 transition">Terms of Service</a></li>
                            <li><a href="#" className="text-sm hover:text-primary-400 transition">Support Desk</a></li>
                        </ul>
                    </div>

                    {/* Project Info */}
                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Project Info</h3>
                        <ul className="space-y-3">
                            <li className="text-sm text-gray-400">Academic Project - MCA</li>
                            <li className="text-sm text-gray-400">MERN Stack Application</li>
                            <li className="text-sm text-gray-400">Designed for focused learning</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-800 text-center">
                    <p className="text-sm text-gray-500">
                        &copy; 2026 AstraQuiz. All Rights Reserved. "Clear tests, honest results, better learning."
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
