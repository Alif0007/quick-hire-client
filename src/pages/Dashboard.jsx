// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import logo from '../../assets/logo.png'
import {
    LayoutDashboard,
    MessageSquare,
    Building2,
    Users,
    Briefcase,
    Calendar,
    Settings,
    HelpCircle,
    Bell,
    Plus,
    ChevronDown,
    Eye,
    Download,
    Menu,
    X,
} from 'lucide-react';
import LoginForm from '../components/LoginForm';
import JobPostModal from '../components/JobPostModal';
import { addJob } from '../services/api';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import AllApplicants from './AllApplicants';
import JobListing from './JobListing';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [showJobModal, setShowJobModal] = useState(false);
    const [currentPage, setCurrentPage] = useState('dashboard'); // 'dashboard', 'applicants', 'jobs'

    // Mock data for chart
    const chartData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Job View',
                data: [122, 34, 80, 120, 150, 65, 40],
                backgroundColor: '#fbbf24', // amber/orange
            },
            {
                label: 'Job Applied',
                data: [80, 100, 65, 110, 90, 45, 70],
                backgroundColor: '#3b82f6', // blue
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' },
            tooltip: { mode: 'index', intersect: false },
        },
        scales: {
            x: { stacked: false },
            y: { stacked: false, beginAtZero: true },
        },
    };

    const handleLogin = (password) => {
        if (password === 'admin123') {
            setAuthenticated(true);
        } else {
            alert('Invalid password. Please try again.');
        }
    };

    const handlePostJob = async (jobData) => {
        try {
            const response = await addJob(jobData);
            if (response.success) {
                // Success is now handled by the modal's success alert
                return response;
            } else {
                throw new Error(response.message || 'Unknown error');
            }
        } catch (error) {
            console.error('Error posting job:', error);
            throw error;
        }
    };

    if (!authenticated) {
        return <LoginForm onLogin={handleLogin} title="Admin Login" hint="admin123" />;
    }

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`fixed md:relative z-30 inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-white border-r border-gray-200 md:flex md:flex-col h-full`}>
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                <img src={logo} alt="" />
                            </div>
                            <span className="text-xl font-bold text-gray-900 font-playfair">QuickHire</span>
                        </div>
                        {/* Close button for mobile */}
                        <button
                            className="md:hidden text-gray-500 hover:text-gray-700"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1">
                    <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); setCurrentPage('dashboard'); }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium ${currentPage === 'dashboard' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                        <MessageSquare size={20} />
                        Messages
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                        <Building2 size={20} />
                        Company Profile
                    </a>
                    <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); setCurrentPage('applicants'); }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg ${currentPage === 'applicants' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                        <Users size={20} />
                        All Applicants
                    </a>
                    <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); setCurrentPage('jobs'); }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg ${currentPage === 'jobs' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                        <Briefcase size={20} />
                        Job Listing
                    </a>
                    <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); /* setCurrentPage('schedule'); */ }}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                        <Calendar size={20} />
                        My Schedule
                    </a>

                    <div className="pt-6 mt-6 border-t border-gray-200">
                        <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Settings</p>
                        <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); /* setCurrentPage('settings'); */ }}
                            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                        >
                            <Settings size={20} />
                            Settings
                        </a>
                        <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); /* setCurrentPage('help'); */ }}
                            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                        >
                            <HelpCircle size={20} />
                            Help Center
                        </a>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Bar */}
                <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {/* Hamburger menu for mobile */}
                        <button
                            className="md:hidden text-gray-600 hover:text-gray-900"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">
                                N
                            </div>
                            <span className="font-medium font-epilogue">Al Amin Alif</span>
                            <ChevronDown size={16} className="text-gray-500" />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setAuthenticated(false)}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                        >
                            Logout
                        </button>
                        <Bell size={20} className="text-gray-600 cursor-pointer" />
                        <button
                            onClick={() => setShowJobModal(true)}
                            className="flex items-center gap-1 bg-blue-600 text-white px-2 lg:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Plus size={18} />
                            Post a job
                        </button>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 overflow-y-auto">
                    {currentPage === 'dashboard' && (
                        <div className="p-6 lg:p-8">
                            <div className="mb-8">
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-playfair">Welcome Back, Al Amin Alif</h1>
                                <p className="text-gray-600 mt-1 font-epilogue">
                                    Here is your job listings statistic report from Jul 19 - Jul 25.
                                </p>
                            </div>

                            {/* Date Picker & Period */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                                <div className="flex items-center gap-3 bg-white border border-gray-300 rounded-lg px-4 py-2">
                                    <span className="text-gray-700">Jul 19 - Jul 25</span>
                                    <button className="text-gray-500 hover:text-gray-700">
                                        <Calendar size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                                <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-xl p-6 shadow-md">
                                    <p className="text-purple-100 mb-2 font-epilogue">New candidates to review</p>
                                    <p className="text-4xl font-bold font-playfair">76</p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="text-purple-200 text-sm font-epilogue">→</span>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 shadow-md">
                                    <p className="text-green-100 mb-2 font-epilogue">Schedule for today</p>
                                    <p className="text-4xl font-bold font-playfair">3</p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="text-green-200 text-sm font-epilogue">→</span>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-md">
                                    <p className="text-blue-100 mb-2 font-epilogue">Messages received</p>
                                    <p className="text-4xl font-bold font-playfair">24</p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="text-blue-200 text-sm font-epilogue">→</span>
                                    </div>
                                </div>
                            </div>

                            {/* Job Stats Section */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Main Chart */}
                                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-900 font-playfair">Job statistics</h2>
                                            <p className="text-gray-600 mt-1 font-epilogue">Showing Jobstatistic Jul 19-25</p>
                                        </div>
                                        <div className="flex gap-2 mt-4 sm:mt-0">
                                            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium">Week</button>
                                            <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Month</button>
                                            <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Year</button>
                                        </div>
                                    </div>

                                    <div className="tabs flex gap-6 border-b mb-6">
                                        <button className="pb-3 border-b-2 border-blue-600 text-blue-600 font-medium">Overview</button>
                                        <button className="pb-3 text-gray-600 hover:text-gray-900">Jobs View</button>
                                        <button className="pb-3 text-gray-600 hover:text-gray-900">Jobs Applied</button>
                                    </div>

                                    <div className="h-80">
                                        <Bar data={chartData} options={chartOptions} />
                                    </div>

                                    {/* Small metrics */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                                        <div className="bg-gray-50 p-5 rounded-lg">
                                            <div className="flex items-center justify-between">
                                                <p className="text-gray-600">Job Views</p>
                                                <Eye size={18} className="text-gray-400" />
                                            </div>
                                            <p className="text-3xl font-bold mt-2">2,342</p>
                                            <p className="text-green-600 text-sm mt-1">This Week 6.4% ▲</p>
                                        </div>

                                        <div className="bg-gray-50 p-5 rounded-lg">
                                            <div className="flex items-center justify-between">
                                                <p className="text-gray-600">Job Applied</p>
                                                <Download size={18} className="text-gray-400" />
                                            </div>
                                            <p className="text-3xl font-bold mt-2">654</p>
                                            <p className="text-red-600 text-sm mt-1">This Week 0.5% ▼</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-6">
                                    {/* Job Open */}
                                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                                        <h3 className="text-lg font-semibold mb-4">Job Open</h3>
                                        <p className="text-5xl font-bold text-gray-900">12</p>
                                        <p className="text-gray-600 mt-1">Jobs Opened</p>
                                    </div>

                                    {/* Applicants Summary */}
                                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                                        <h3 className="text-lg font-semibold mb-4">Applicants Summary</h3>
                                        <p className="text-5xl font-bold text-gray-900 mb-4">67</p>

                                        <div className="space-y-3">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Full Time</span>
                                                <span className="font-medium">45</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '67%' }}></div>
                                            </div>

                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Internship</span>
                                                <span className="font-medium">32</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '48%' }}></div>
                                            </div>

                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Part-Time</span>
                                                <span className="font-medium">24</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '36%' }}></div>
                                            </div>

                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Contract</span>
                                                <span className="font-medium">30</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-red-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                                            </div>

                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Remote</span>
                                                <span className="font-medium">22</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '33%' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentPage === 'applicants' && (
                        <AllApplicants />
                    )}

                    {currentPage === 'jobs' && (
                        <JobListing />
                    )}
                </main>
                {/* Job Post Modal */}
                <JobPostModal
                    isOpen={showJobModal}
                    onClose={() => setShowJobModal(false)}
                    onSubmit={handlePostJob}
                />
            </div>
        </div>
    );
}

