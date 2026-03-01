import React, { useState } from 'react';
import { X } from 'lucide-react';
import { submitApplication } from '../services/api';

const JobApplicationModal = ({ jobId, jobTitle, onClose }) => {
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

        // Clear error when user starts typing
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
            // Prepare application data
            const applicationData = {
                jobId,
                jobTitle, // Include the job title in the application
                applicantName: formData.name,
                email: formData.email,
                resume: formData.resumeLink,
                coverLetter: formData.coverNote,
            };

            // Submit application via API
            const response = await submitApplication(applicationData);

            if (response.success) {
                setSubmitted(true);

                // Reset form after successful submission
                setTimeout(() => {
                    setFormData({
                        name: '',
                        email: '',
                        resumeLink: '',
                        coverNote: ''
                    });
                    setSubmitting(false);
                }, 2000);
            } else {
                console.error('Application submission failed:', response);
                setSubmitting(false);
            }
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
                            <X className="h-6 w-6" />
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
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 ${errors.name ? 'border-red-500' : 'border-gray-300'
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
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 ${errors.email ? 'border-red-500' : 'border-gray-300'
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
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 ${errors.resumeLink ? 'border-red-500' : 'border-gray-300'
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
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 ${errors.coverNote ? 'border-red-500' : 'border-gray-300'
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
                                className="flex-1 px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition duration-300 disabled:opacity-50"
                            >
                                {submitting ? 'Submitting...' : 'Submit Application'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default JobApplicationModal;