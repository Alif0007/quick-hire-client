import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { addJob } from '../services/api';
import SuccessAlert from './SuccessAlert';

export default function JobPostModal({ isOpen, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        category: '',
        type: '',
        salary: '',
        description: '',
        requirements: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const jobTypes = ['Full Time', 'Part Time', 'Contract', 'Remote', 'Internship'];
    const categories = ['Development', 'Design', 'Marketing', 'Sales', 'Finance', 'HR', 'Operations', 'Other'];

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Job title is required';
        }

        if (!formData.company.trim()) {
            newErrors.company = 'Company name is required';
        }

        if (!formData.location.trim()) {
            newErrors.location = 'Location is required';
        }

        if (!formData.category) {
            newErrors.category = 'Category is required';
        }

        if (!formData.type) {
            newErrors.type = 'Job type is required';
        }

        if (!formData.salary.trim()) {
            newErrors.salary = 'Salary information is required';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Job description is required';
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

        setIsSubmitting(true);
        try {
            // Convert requirements string to array if provided
            const jobData = {
                ...formData,
                requirements: formData.requirements ?
                    formData.requirements.split('\n').filter(req => req.trim()) :
                    []
            };

            await onSubmit(jobData);
            // Show success message
            setShowSuccess(true);
        } catch (error) {
            console.error('Error submitting job:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (!isSubmitting) {
            setFormData({
                title: '',
                company: '',
                location: '',
                category: '',
                type: '',
                salary: '',
                description: '',
                requirements: ''
            });
            setErrors({});
            setShowSuccess(false);
            onClose();
        }
    };

    const handlePostJob = async (jobData) => {
        try {
            const response = await addJob(jobData);
            if (response.success) {
                // Success is now handled by the modal's success alert
                setShowSuccess(true);
                return response;
            } else {
                throw new Error(response.message || 'Unknown error');
            }
        } catch (error) {
            console.error('Error posting job:', error);
            throw error;
        }
    };

    const handleSuccessClose = () => {
        // Reset form and close everything
        setFormData({
            title: '',
            company: '',
            location: '',
            category: '',
            type: '',
            salary: '',
            description: '',
            requirements: ''
        });
        setErrors({});
        setShowSuccess(false);
        onClose();
    };
    if (!isOpen) return null;

    // Show success alert if job was posted successfully
    if (showSuccess) {
        return (
            <AnimatePresence>
                <SuccessAlert
                    key="success-alert"
                    title="Job Posted Successfully!"
                    message={`Your job posting "${formData.title}" has been published and is now live on the job board.`}
                    onClose={handleSuccessClose}
                />
            </AnimatePresence>
        );
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 overflow-y-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={handleClose}
                    ></motion.div>

                    {/* Modal */}
                    <div className="flex min-h-full items-center justify-center p-4">
                        <motion.div
                            className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                                duration: 0.3
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-900">Post a New Job</h2>
                                <button
                                    onClick={handleClose}
                                    disabled={isSubmitting}
                                    className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Form */}
                            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Job Title */}
                                        <div className="md:col-span-2">
                                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                                Job Title *
                                            </label>
                                            <input
                                                type="text"
                                                id="title"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.title ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                placeholder="e.g., Senior Frontend Developer"
                                                disabled={isSubmitting}
                                            />
                                            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                                        </div>

                                        {/* Company */}
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
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.company ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                placeholder="Company name"
                                                disabled={isSubmitting}
                                            />
                                            {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
                                        </div>

                                        {/* Location */}
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
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.location ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                placeholder="e.g., San Francisco, CA or Remote"
                                                disabled={isSubmitting}
                                            />
                                            {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                                        </div>

                                        {/* Category */}
                                        <div>
                                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                                Category *
                                            </label>
                                            <select
                                                id="category"
                                                name="category"
                                                value={formData.category}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.category ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                disabled={isSubmitting}
                                            >
                                                <option value="">Select category</option>
                                                {categories.map(category => (
                                                    <option key={category} value={category}>{category}</option>
                                                ))}
                                            </select>
                                            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                                        </div>

                                        {/* Job Type */}
                                        <div>
                                            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                                                Job Type *
                                            </label>
                                            <select
                                                id="type"
                                                name="type"
                                                value={formData.type}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.type ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                disabled={isSubmitting}
                                            >
                                                <option value="">Select job type</option>
                                                {jobTypes.map(type => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                            {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
                                        </div>

                                        {/* Salary */}
                                        <div className="md:col-span-2">
                                            <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
                                                Salary *
                                            </label>
                                            <input
                                                type="text"
                                                id="salary"
                                                name="salary"
                                                value={formData.salary}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.salary ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                placeholder="e.g., $80,000 - $120,000 or Competitive"
                                                disabled={isSubmitting}
                                            />
                                            {errors.salary && <p className="mt-1 text-sm text-red-600">{errors.salary}</p>}
                                        </div>

                                        {/* Requirements */}
                                        <div className="md:col-span-2">
                                            <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">
                                                Requirements (one per line, optional)
                                            </label>
                                            <textarea
                                                id="requirements"
                                                name="requirements"
                                                value={formData.requirements}
                                                onChange={handleChange}
                                                rows={4}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="• Bachelor's degree in Computer Science&#10;• 3+ years of experience&#10;• Proficiency in React"
                                                disabled={isSubmitting}
                                            ></textarea>
                                            <p className="mt-1 text-sm text-gray-500">Enter each requirement on a new line</p>
                                        </div>

                                        {/* Description */}
                                        <div className="md:col-span-2">
                                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                                Job Description *
                                            </label>
                                            <textarea
                                                id="description"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                                rows={6}
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.description ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                placeholder="Detailed job description including responsibilities, qualifications, and company information..."
                                                disabled={isSubmitting}
                                            ></textarea>
                                            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                                        </div>
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                                        <button
                                            type="button"
                                            onClick={handleClose}
                                            disabled={isSubmitting}
                                            className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition duration-300 disabled:opacity-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-300 disabled:opacity-50 flex items-center"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Posting...
                                                </>
                                            ) : (
                                                'Post Job'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}