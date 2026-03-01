import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'


export default function Header() {
    return (
        <header className="flex items-center justify-between  py-3 border-b">
            {/* Header / Navigation */}
            <div className="relative z-20 container mx-auto px-6 md:px-10 lg:px-16 pt-2 flex items-center justify-between">
                {/* Logo + brand name */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 md:w-11 md:h-11">
                        <img src={logo} alt="" />
                    </div>
                    <span className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">QuickHire</span>
                </div>

                {/* Nav links + Auth buttons */}

                <nav className="hidden md:flex items-center gap-8">
                    <Link to="/jobs" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                        Find Jobs
                    </Link>
                    <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                        Browse Companies
                    </a>
                </nav>

                <div className="flex items-center gap-4">
                    <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                        Login
                    </button>
                    <button className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                        Sign Up
                    </button>
                </div>
            </div>
        </header>
    );
}