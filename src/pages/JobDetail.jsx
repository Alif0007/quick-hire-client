import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import JobApplicationModal from '../components/JobApplicationModal';
import { fetchJobById } from '../services/api';

export default function JobDetail() {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showApplicationModal, setShowApplicationModal] = useState(false);

    useEffect(() => {
        const loadJob = async () => {
            try {
                const data = await fetchJobById(id);
                // Handle both direct object and {success: true, data: {...}} structures
                if (data && data.success !== undefined && data.data) {
                    setJob(data.data);
                } else {
                    setJob(data);
                }
            } catch (error) {
                console.error('Error loading job:', error);
                // Show error state instead of mock data
                setJob(null);
            } finally {
                setLoading(false);
            }
        };

        loadJob();
    }, [id]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading job details...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!job) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-800">Job not found</h2>
                        <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
                            Back to Home
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="max-w-4xl mx-auto px-6 py-8">
                <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to Jobs
                </Link>

                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-8">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center space-x-6">
                                <div className="bg-blue-100 border-2 border-blue-200 rounded-xl w-20 h-20 flex items-center justify-center">
                                    <span className="text-2xl font-bold text-blue-600">{job.company?.charAt(0) || 'C'}</span>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
                                    <p className="text-xl text-blue-600 font-medium mt-1">{job.company}</p>
                                    <div className="flex items-center text-gray-600 mt-2">
                                        <span>📍 {job.location}</span>
                                    </div>
                                </div>
                            </div>
                            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${job.type === 'Full Time' ? 'bg-green-100 text-green-800' :
                                job.type === 'Part Time' ? 'bg-blue-100 text-blue-800' :
                                    job.type === 'Remote' ? 'bg-purple-100 text-purple-800' :
                                        'bg-gray-100 text-gray-800'
                                }`}>
                                {job.type}
                            </span>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <div className="flex items-center text-gray-600">
                                <span>Category: {job.category}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <span>Posted: {formatDate(job.createdAt)}</span>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Job Description</h2>
                            <div className="prose max-w-none text-gray-600 whitespace-pre-line">
                                {job.description}
                            </div>
                        </div>

                        {/* Requirements Section */}
                        {job.requirements && job.requirements.length > 0 && (
                            <div className="mt-8">
                                <h2 className="text-xl font-bold text-gray-800 mb-4">Requirements</h2>
                                <ul className="space-y-2">
                                    {job.requirements.map((requirement, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="text-green-500 mr-2">✓</span>
                                            <span className="text-gray-600">{requirement}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Benefits Section */}
                        {job.benefits && job.benefits.length > 0 && (
                            <div className="mt-8">
                                <h2 className="text-xl font-bold text-gray-800 mb-4">Benefits</h2>
                                <ul className="space-y-2">
                                    {job.benefits.map((benefit, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="text-blue-500 mr-2">•</span>
                                            <span className="text-gray-600">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Application Deadline */}
                        {job.applicationDeadline && (
                            <div className="mt-8 pt-8 border-t border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Application Deadline</h3>
                                <p className="text-gray-600">{formatDate(job.applicationDeadline)}</p>
                            </div>
                        )}

                        <div className="mt-10 pt-8 border-t border-gray-200">
                            <button
                                onClick={() => setShowApplicationModal(true)}
                                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
                            >
                                Apply Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showApplicationModal && (
                <JobApplicationModal
                    jobId={job._id}
                    jobTitle={job.title}
                    onClose={() => setShowApplicationModal(false)}
                />
            )}

            <Footer />
        </div>
    );
}