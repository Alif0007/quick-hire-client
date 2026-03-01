import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchJobs, addJob, deleteJob } from '../services/api';

export default function Admin() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [password, setPassword] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        category: '',
        type: '',
        description: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (authenticated) {
            const loadJobs = async () => {
                try {
                    const data = await fetchJobs();
                    setJobs(data);
                } catch (error) {
                    console.error('Error loading jobs:', error);
                } finally {
                    setLoading(false);
                }
            };

            loadJobs();
        }
    }, [authenticated]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'admin123') {
            setAuthenticated(true);
            setLoading(true);
        } else {
            alert('Invalid password. Please try again.');
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (!formData.company.trim()) {
            newErrors.company = 'Company is required';
        }

        if (!formData.location.trim()) {
            newErrors.location = 'Location is required';
        }

        if (!formData.category.trim()) {
            newErrors.category = 'Category is required';
        }

        if (!formData.type.trim()) {
            newErrors.type = 'Type is required';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddJob = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const newJob = await addJob(formData, 'admin123');
            setJobs([newJob, ...jobs]);
            setFormData({
                title: '',
                company: '',
                location: '',
                category: '',
                type: '',
                description: ''
            });
            setShowAddForm(false);
        } catch (error) {
            console.error('Error adding job:', error);
        }
    };

    const handleDeleteJob = async (id) => {
        if (!window.confirm('Are you sure you want to delete this job?')) {
            return;
        }

        try {
            await deleteJob(id, 'admin123');
            setJobs(jobs.filter(job => job._id !== id));
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    if (!authenticated) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Admin Login</h2>
                        <form onSubmit={handleLogin}>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter admin password"
                                />
                                <p className="mt-2 text-sm text-gray-500">Hint: admin123</p>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading jobs...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => setAuthenticated(false)}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                        >
                            Logout
                        </button>
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Job
                        </button>
                    </div>
                </div>

                {/* Add Job Form */}
                {showAddForm && (
                    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">Add New Job</h2>
                        <form onSubmit={handleAddJob}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                        Job Title *
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.title ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="Enter job title"
                                    />
                                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                                </div>

                                <div>
                                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                                        Company *
                                    </label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.company ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="Enter company name"
                                    />
                                    {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
                                </div>

                                <div>
                                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                                        Location *
                                    </label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.location ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="Enter location"
                                    />
                                    {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                                </div>

                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                        Category *
                                    </label>
                                    <input
                                        type="text"
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.category ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="Enter category"
                                    />
                                    {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                                </div>

                                <div>
                                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                                        Type *
                                    </label>
                                    <select
                                        id="type"
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.type ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    >
                                        <option value="">Select job type</option>
                                        <option value="Full Time">Full Time</option>
                                        <option value="Part Time">Part Time</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Remote">Remote</option>
                                    </select>
                                    {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                        Description *
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows={4}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.description ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="Enter job description"
                                    ></textarea>
                                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                                </div>
                            </div>

                            <div className="mt-6 flex space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setShowAddForm(false)}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-300"
                                >
                                    Add Job
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Jobs List */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">All Jobs ({jobs.length})</h2>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Position
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Company
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Location
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Type
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {jobs.map((job) => (
                                        <tr key={job._id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{job.title}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{job.company}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{job.location}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{job.category}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${job.type === 'Full Time' ? 'bg-green-100 text-green-800' :
                                                        job.type === 'Part Time' ? 'bg-blue-100 text-blue-800' :
                                                            job.type === 'Remote' ? 'bg-purple-100 text-purple-800' :
                                                                'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {job.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => handleDeleteJob(job._id)}
                                                    className="text-red-600 hover:text-red-900 mr-4"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {jobs.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500">No jobs found. Add your first job to get started.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}