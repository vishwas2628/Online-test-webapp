import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiLogOut, FiUser, FiHome, FiInfo } from 'react-icons/fi';

import Logo from './Logo';

const Navbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Determines if we are on a page where the navbar should be transparent (overlaying a hero)
    // It remains transparent ONLY if we are at the top of the page.
    const isTransparentPage = location.pathname === '/';
    const isTransparent = isTransparentPage && !isScrolled;

    // Header style classes
    const headerClasses = `fixed w-full z-50 transition-all duration-300 ${isTransparent
        ? 'bg-transparent text-white pt-6 pb-2'
        : 'bg-white/95 backdrop-blur-md text-gray-900 shadow-sm border-b border-stone-200 py-3'
        }`;

    // Link style classes
    const navLinkClasses = (path) => `font-medium transition duration-200 relative group/link ${location.pathname === path
        ? 'text-primary-600 font-bold'
        : isTransparent ? 'text-white/90 hover:text-white' : 'text-gray-600 hover:text-primary-600'
        }`;

    return (
        <nav className={headerClasses}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center transition-all duration-300">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <Logo className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
                        <span className={`text-2xl font-heading font-bold tracking-tight transition-colors duration-300 ${isTransparent ? 'text-white' : 'text-gray-900'
                            }`}>
                            AstraQuiz
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className={navLinkClasses('/')}>
                            Home
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover/link:w-full ${isTransparent ? 'bg-white' : 'bg-primary-600'
                                }`}></span>
                        </Link>
                        <Link to="/about" className={navLinkClasses('/about')}>
                            About
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover/link:w-full ${isTransparent ? 'bg-white' : 'bg-primary-600'
                                }`}></span>
                        </Link>

                        {user ? (
                            <>
                                <Link
                                    to={user.role === 'teacher' ? '/teacher' : '/student'}
                                    className={navLinkClasses(user.role === 'teacher' ? '/teacher' : '/student')}
                                >
                                    Dashboard
                                </Link>
                                <div className={`flex items-center space-x-4 pl-4 border-l ${isTransparent ? 'border-white/20' : 'border-gray-200'}`}>
                                    <span className={`font-medium transition-colors ${isTransparent ? 'text-white/90' : 'text-gray-500'}`}>
                                        {user.name}
                                    </span>
                                    <button
                                        onClick={logout}
                                        className={`flex items-center space-x-2 px-4 py-2 rounded-full transition duration-300 ${isTransparent
                                            ? 'bg-white/10 text-white hover:bg-white/20'
                                            : 'bg-red-50 text-red-600 hover:bg-red-100'
                                            }`}
                                        title="Logout"
                                    >
                                        <FiLogOut className="text-lg" />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className={navLinkClasses('/login')}>Login</Link>
                                <Link to="/register" className={`px-6 py-2.5 rounded-full font-bold shadow-lg transform hover:-translate-y-0.5 transition duration-300 ${isTransparent
                                    ? 'bg-white text-primary-700 hover:bg-gray-100'
                                    : 'bg-ink text-white hover:bg-primary-800 hover:shadow-primary-500/30'
                                    }`}>
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`p-2 rounded-md transition ${isTransparent ? 'text-white hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            {isOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-stone-200 z-40 animate-fade-in-down">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md hover:bg-gray-50 text-gray-700 font-medium">Home</Link>
                        <Link to="/about" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md hover:bg-gray-50 text-gray-700 font-medium">About</Link>
                        {user ? (
                            <>
                                <Link
                                    to={user.role === 'teacher' ? '/teacher' : '/student'}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-3 py-2 rounded-md hover:bg-gray-50 text-gray-700 font-medium"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={() => { logout(); setIsOpen(false); }}
                                    className="w-full text-left px-3 py-2 rounded-md hover:bg-red-50 text-red-600 font-medium"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className="pt-4 grid grid-cols-2 gap-4">
                                <Link to="/login" onClick={() => setIsOpen(false)} className="block text-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50">Login</Link>
                                <Link to="/register" onClick={() => setIsOpen(false)} className="block text-center px-4 py-2 bg-ink rounded-lg text-white font-medium hover:bg-primary-800">Register</Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
