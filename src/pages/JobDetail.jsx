import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
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
                setJob(data);
            } catch (error) {
                console.error('Error loading job:', error);
                // Fallback to mock data
                setJob({
                    _id: id,
                    title: 'Senior Frontend Developer',
                    company: 'Tech Corp',
                    location: 'San Francisco, CA',
                    category: 'Development',
                    type: 'Full Time',
                    description: `We are looking for a Senior Frontend Developer with experience in React and modern JavaScript frameworks. As a Senior Frontend Developer, you will be responsible for developing user-facing web applications using modern JavaScript frameworks like React, Vue, or Angular. You will work closely with product managers, designers, and backend engineers to deliver high-quality products.
    
    Responsibilities:
    • Develop reusable components and front-end libraries
    • Optimize applications for maximum speed and scalability
    • Ensure the technical feasibility of UI/UX designs
    • Collaborate with other team members and stakeholders
    
    Requirements:
    • Bachelor's degree in Computer Science or related field
    • 5+ years of experience in frontend development
    • Strong knowledge of JavaScript, CSS, HTML, and web technologies
    • Experience with React, Redux, and modern build tools`,
                    createdAt: new Date().toISOString()
                });
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
                <ApplicationModal
                    jobId={job._id}
                    jobTitle={job.title}
                    onClose={() => setShowApplicationModal(false)}
                />
            )}

            <Footer />
        </div>
    );
}

function ApplicationModal({ jobId, jobTitle, onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        resumeLink: '',
        coverNote: ''
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.resumeLink.trim()) {
            newErrors.resumeLink = 'Resume link is required';
        } else if (!formData.resumeLink.startsWith('http://') && !formData.resumeLink.startsWith('https://')) {
            newErrors.resumeLink = 'Resume link must start with http:// or https://';
        }

        if (!formData.coverNote.trim()) {
            newErrors.coverNote = 'Cover note is required';
        } else if (formData.coverNote.length < 10) {
            newErrors.coverNote = 'Cover note must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSubmitted(true);

            setTimeout(() => {
                setFormData({
                    name: '',
                    email: '',
                    resumeLink: '',
                    coverNote: ''
                });
                setSubmitting(false);
            }, 2000);
        } catch (error) {
            console.error('Error submitting application:', error);
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8 text-center">
                    <div className="text-green-500 mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Application Submitted!</h3>
                    <p className="text-gray-600 mb-6">Your application for {jobTitle} has been received. We'll contact you soon.</p>
                    <button
                        onClick={onClose}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-800">Apply for {jobTitle}</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter your full name"
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter your email address"
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="resumeLink" className="block text-sm font-medium text-gray-700 mb-1">
                                    Resume Link *
                                </label>
                                <input
                                    type="url"
                                    id="resumeLink"
                                    name="resumeLink"
                                    value={formData.resumeLink}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.resumeLink ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="https://example.com/my-resume.pdf"
                                />
                                {errors.resumeLink && <p className="mt-1 text-sm text-red-600">{errors.resumeLink}</p>}
                            </div>

                            <div>
                                <label htmlFor="coverNote" className="block text-sm font-medium text-gray-700 mb-1">
                                    Cover Letter *
                                </label>
                                <textarea
                                    id="coverNote"
                                    name="coverNote"
                                    value={formData.coverNote}
                                    onChange={handleChange}
                                    rows={5}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.coverNote ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Tell us why you're interested in this position..."
                                ></textarea>
                                {errors.coverNote && <p className="mt-1 text-sm text-red-600">{errors.coverNote}</p>}
                            </div>
                        </div>

                        <div className="mt-8 flex space-x-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-300 disabled:opacity-50"
                            >
                                {submitting ? 'Submitting...' : 'Submit Application'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}