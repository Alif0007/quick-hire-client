import React, { useState, useEffect } from 'react';
import {
    Briefcase,
    Search,
    Filter,
    Plus,
    Edit,
    Trash2,
    Eye,
    Calendar,
    MapPin,
    DollarSign
} from 'lucide-react';
import { fetchJobs, deleteJob } from '../services/api';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';

export default function JobListing() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [selectedJob, setSelectedJob] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [jobToDelete, setJobToDelete] = useState(null);

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {
        try {
            const response = await fetchJobs();
            if (response.success) {
                // Handle both array and object response formats
                const jobsData = Array.isArray(response.data) ? response.data : response.data?.data || [];
                setJobs(jobsData);
            }
        } catch (error) {
            console.error('Error loading jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (job) => {
        setJobToDelete(job);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        if (!jobToDelete) return;

        try {
            const response = await deleteJob(jobToDelete._id);
            if (response.success) {
                setJobs(jobs.filter(job => job._id !== jobToDelete._id));
                if (selectedJob && selectedJob._id === jobToDelete._id) {
                    setSelectedJob(null);
                }
            }
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    };

    const handleDelete = async (id) => {
        // This function is now deprecated - using the new modal approach
        const job = jobs.find(j => j._id === id);
        if (job) {
            handleDeleteClick(job);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'Full Time': return 'bg-green-100 text-green-800';
            case 'Part Time': return 'bg-blue-100 text-blue-800';
            case 'Remote': return 'bg-purple-100 text-purple-800';
            case 'Contract': return 'bg-yellow-100 text-yellow-800';
            case 'Internship': return 'bg-indigo-100 text-indigo-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.location.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = typeFilter === 'all' || job.type === typeFilter;

        return matchesSearch && matchesType;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Briefcase className="text-blue-600" size={32} />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 font-playfair">Job Listings</h1>
                            <p className="text-gray-600 font-epilogue">Manage all job postings and applications</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">Total Jobs</p>
                            <p className="text-2xl font-bold text-gray-900">{jobs.length}</p>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <Briefcase className="text-blue-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">Full Time</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {jobs.filter(j => j.type === 'Full Time').length}
                            </p>
                        </div>
                        <div className="p-3 bg-green-100 rounded-lg">
                            <Briefcase className="text-green-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">Remote</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {jobs.filter(j => j.type === 'Remote').length}
                            </p>
                        </div>
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <Eye className="text-purple-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">Active Jobs</p>
                            <p className="text-2xl font-bold text-gray-900">{jobs.length}</p>
                        </div>
                        <div className="p-3 bg-green-100 rounded-lg">
                            <Plus className="text-green-600" size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search jobs..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="all">All Types</option>
                            <option value="Full Time">Full Time</option>
                            <option value="Part Time">Part Time</option>
                            <option value="Remote">Remote</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Jobs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                    <div key={job._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{job.title}</h3>
                                    <p className="text-blue-600 font-medium">{job.company}</p>
                                </div>
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(job.type)}`}>
                                    {job.type}
                                </span>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center text-gray-600 text-sm">
                                    <MapPin size={16} className="mr-2" />
                                    {job.location}
                                </div>
                                {job.salary && (
                                    <div className="flex items-center text-gray-600 text-sm">
                                        <DollarSign size={16} className="mr-2" />
                                        {job.salary}
                                    </div>
                                )}
                                <div className="flex items-center text-gray-600 text-sm">
                                    <Calendar size={16} className="mr-2" />
                                    Posted: {formatDate(job.createdAt || job.postedDate)}
                                </div>
                            </div>

                            {job.description && (
                                <div className="mb-6">
                                    <p className="text-gray-700 text-sm line-clamp-3">
                                        {job.description.substring(0, 120)}...
                                    </p>
                                </div>
                            )}

                            <div className="flex gap-2">
                                <button
                                    onClick={() => setSelectedJob(job)}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2"
                                >
                                    <Eye size={16} />
                                    View
                                </button>
                                <button
                                    onClick={() => handleDeleteClick(job)}
                                    className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-300"
                                    title="Delete Job"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredJobs.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
                    <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No jobs found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {searchTerm ? 'Try adjusting your search terms' : 'No jobs have been posted yet'}
                    </p>
                </div>
            )}

            {/* Job Detail Modal */}
            {selectedJob && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-gray-900">Job Details</h3>
                                <button
                                    onClick={() => setSelectedJob(null)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedJob.title}</h2>
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="text-blue-600 font-medium">{selectedJob.company}</span>
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(selectedJob.type)}`}>
                                            {selectedJob.type}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center text-gray-600">
                                        <MapPin size={18} className="mr-2" />
                                        <span>{selectedJob.location}</span>
                                    </div>
                                    {selectedJob.salary && (
                                        <div className="flex items-center text-gray-600">
                                            <DollarSign size={18} className="mr-2" />
                                            <span>{selectedJob.salary}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center text-gray-600">
                                        <Calendar size={18} className="mr-2" />
                                        <span>Posted: {formatDate(selectedJob.createdAt || selectedJob.postedDate)}</span>
                                    </div>
                                </div>

                                {selectedJob.description && (
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h4>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <p className="text-gray-700 whitespace-pre-wrap">{selectedJob.description}</p>
                                        </div>
                                    </div>
                                )}

                                {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h4>
                                        <ul className="bg-gray-50 p-4 rounded-lg space-y-2">
                                            {selectedJob.requirements.map((req, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="text-blue-600 mr-2">•</span>
                                                    <span className="text-gray-700">{req}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="flex gap-3 pt-4 border-t border-gray-200">
                                    <button
                                        onClick={() => handleDeleteClick(selectedJob)}
                                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2"
                                    >
                                        <Trash2 size={16} />
                                        Delete Job
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setJobToDelete(null);
                }}
                onConfirm={handleDeleteConfirm}
                title="Delete Job"
                message={`Are you sure you want to delete "${jobToDelete?.title}" at ${jobToDelete?.company}? This action cannot be undone and will permanently remove this job posting from your system.`}
                confirmText="Delete Job"
                cancelText="Cancel"
                itemType="job"
            />
        </div>
    );
}