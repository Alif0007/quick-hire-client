import React, { useState, useEffect } from 'react';
import {
    Users,
    Search,
    Filter,
    Eye,
    Download,
    Trash2,
    Calendar,
    Mail,
    FileText
} from 'lucide-react';
import { fetchApplications, deleteApplication } from '../services/api';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';

export default function AllApplicants() {
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [applicantToDelete, setApplicantToDelete] = useState(null);

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {
        try {
            const response = await fetchApplications();
            if (response.success) {
                setApplicants(response.data);
            }
        } catch (error) {
            console.error('Error loading applications:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (applicant) => {
        setApplicantToDelete(applicant);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        if (!applicantToDelete) return;

        try {
            const response = await deleteApplication(applicantToDelete._id);
            if (response.success) {
                setApplicants(applicants.filter(app => app._id !== applicantToDelete._id));
                if (selectedApplicant && selectedApplicant._id === applicantToDelete._id) {
                    setSelectedApplicant(null);
                }
            }
        } catch (error) {
            console.error('Error deleting application:', error);
        }
    };

    const handleDelete = async (id) => {
        // This function is now deprecated - using the new modal approach
        const applicant = applicants.find(a => a._id === id);
        if (applicant) {
            handleDeleteClick(applicant);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'reviewed': return 'bg-blue-100 text-blue-800';
            case 'accepted': return 'bg-green-100 text-green-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredApplicants = applicants.filter(applicant => {
        const matchesSearch = applicant.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            applicant.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || applicant.status === statusFilter;

        return matchesSearch && matchesStatus;
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
                <div className="flex items-center gap-3 mb-2">
                    <Users className="text-blue-600" size={32} />
                    <h1 className="text-3xl font-bold text-gray-900 font-playfair">All Applicants</h1>
                </div>
                <p className="text-gray-600 font-epilogue">Manage and review all job applications</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">Total Applications</p>
                            <p className="text-2xl font-bold text-gray-900">{applicants.length}</p>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <Users className="text-blue-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">Pending Review</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {applicants.filter(a => a.status === 'pending').length}
                            </p>
                        </div>
                        <div className="p-3 bg-yellow-100 rounded-lg">
                            <FileText className="text-yellow-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">Accepted</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {applicants.filter(a => a.status === 'accepted').length}
                            </p>
                        </div>
                        <div className="p-3 bg-green-100 rounded-lg">
                            <Eye className="text-green-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">Jobs Applied</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {new Set(applicants.map(a => a.jobId)).size}
                            </p>
                        </div>
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <Download className="text-purple-600" size={24} />
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
                                placeholder="Search applicants..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Applications Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Applicant
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Job Applied
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Applied Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredApplicants.map((applicant) => (
                                <tr key={applicant._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                    <span className="text-blue-800 font-medium">
                                                        {applicant.applicantName.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {applicant.applicantName}
                                                </div>
                                                <div className="text-sm text-gray-500 flex items-center gap-1">
                                                    <Mail size={14} />
                                                    {applicant.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900 font-medium">
                                            {applicant.jobTitle}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Job ID: {applicant.jobId}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Calendar size={14} className="mr-1" />
                                            {formatDate(applicant.appliedAt)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(applicant.status)}`}>
                                            {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => setSelectedApplicant(applicant)}
                                                className="text-blue-600 hover:text-blue-900 p-1 rounded"
                                                title="View Details"
                                            >
                                                <Eye size={18} />
                                            </button>
                                            <a
                                                href={applicant.resume}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-green-600 hover:text-green-900 p-1 rounded"
                                                title="View Resume"
                                            >
                                                <Download size={18} />
                                            </a>
                                            <button
                                                onClick={() => handleDeleteClick(applicant)}
                                                className="text-red-600 hover:text-red-900 p-1 rounded"
                                                title="Delete Application"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredApplicants.length === 0 && (
                    <div className="text-center py-12">
                        <Users className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No applications found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            {searchTerm ? 'Try adjusting your search terms' : 'No applications have been submitted yet'}
                        </p>
                    </div>
                )}
            </div>

            {/* Application Detail Modal */}
            {selectedApplicant && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-gray-900">Application Details</h3>
                                <button
                                    onClick={() => setSelectedApplicant(null)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Applicant Name</label>
                                        <p className="text-gray-900">{selectedApplicant.applicantName}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <p className="text-gray-900">{selectedApplicant.email}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                                        <p className="text-gray-900">{selectedApplicant.jobTitle}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Applied Date</label>
                                        <p className="text-gray-900">{formatDate(selectedApplicant.appliedAt)}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedApplicant.status)}`}>
                                            {selectedApplicant.status.charAt(0).toUpperCase() + selectedApplicant.status.slice(1)}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Cover Letter</label>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-gray-700 whitespace-pre-wrap">{selectedApplicant.coverLetter}</p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <a
                                        href={selectedApplicant.resume}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg text-center transition duration-300"
                                    >
                                        View Resume
                                    </a>
                                    <button
                                        onClick={() => handleDeleteClick(selectedApplicant)}
                                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
                                    >
                                        Delete Application
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
                    setApplicantToDelete(null);
                }}
                onConfirm={handleDeleteConfirm}
                title="Delete Application"
                message={`Are you sure you want to delete ${applicantToDelete?.applicantName}'s application for "${applicantToDelete?.jobTitle}"? This action cannot be undone.`}
                confirmText="Delete Application"
                cancelText="Cancel"
                itemType="application"
            />
        </div>
    );
}