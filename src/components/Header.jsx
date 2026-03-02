import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'


export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className=" flex items-center justify-between py-3 border-b">
            <div className="relative z-40 container mx-auto px-6 md:px-10 lg:px-16 pt-2 flex items-center justify-between">
                {/* Logo + brand name */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 md:w-11 md:h-11">
                        <img src={logo} alt="QuickHire Logo" />
                    </div>
                    <span className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight font-playfair">QuickHire</span>
                </div>

                {/* Desktop Navigation - Hidden on mobile */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link to="/jobs" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                        Find Jobs
                    </Link>
                    <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                        Browse Companies
                    </a>
                </nav>

                {/* Mobile Menu Button - Hidden on desktop */}
                <div className="flex items-center gap-4 md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-gray-700 focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Desktop Auth Buttons - Hidden on mobile */}
                <div className="hidden md:flex items-center gap-4">
                    <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                        Login
                    </button>
                    <button className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                        Sign Up
                    </button>
                </div>
            </div>

            {/* Mobile Menu - Hidden on desktop */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-[70px] left-0 right-0 bg-white shadow-lg z-50 py-4 px-6 ">
                    <nav className="flex flex-col gap-4">
                        <Link
                            to="/jobs"
                            className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2 border-b border-gray-100"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Find Jobs
                        </Link>
                        <a
                            href="#"
                            className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2 border-b border-gray-100"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Browse Companies
                        </a>
                        <div className="flex flex-col gap-3 pt-2">
                            <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2 text-left">
                                Login
                            </button>
                            <button className="w-full px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                                Sign Up
                            </button>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}