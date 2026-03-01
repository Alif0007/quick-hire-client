// src/pages/AllJobs.jsx
import React, { useState, useEffect } from 'react';
import { fetchJobs } from '../services/api';
import JobCard from '../components/JobCard';
import { Search, MapPin, Briefcase, Filter } from 'lucide-react';

export default function AllJobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {
        try {
            setLoading(true);
            const response = await fetchJobs();

            // Handle both API response formats
            const jobsData = response.data || response;
            setJobs(Array.isArray(jobsData) ? jobsData : []);
        } catch (err) {
            setError('Failed to load jobs');
            console.error('Error loading jobs:', err);
        } finally {
            setLoading(false);
        }
    };

    // Filter jobs based on search and filters
    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.description?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesLocation = !locationFilter ||
            job.location?.toLowerCase().includes(locationFilter.toLowerCase());

        const matchesType = !typeFilter ||
            job.type?.toLowerCase().includes(typeFilter.toLowerCase());

        return matchesSearch && matchesLocation && matchesType;
    });

    // Get unique locations and job types for filters
    const uniqueLocations = [...new Set(jobs.map(job => job.location).filter(Boolean))];
    const uniqueTypes = [...new Set(jobs.map(job => job.type).filter(Boolean))];

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading jobs...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="text-red-500 text-xl mb-4">⚠️</div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Jobs</h2>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <button
                            onClick={loadJobs}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Dream Job</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Browse through our curated collection of job opportunities from top companies
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {/* Search Input */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Search jobs, companies..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Location Filter */}
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <select
                                value={locationFilter}
                                onChange={(e) => setLocationFilter(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                            >
                                <option value="">All Locations</option>
                                {uniqueLocations.map(location => (
                                    <option key={location} value={location}>{location}</option>
                                ))}
                            </select>
                        </div>

                        {/* Job Type Filter */}
                        <div className="relative">
                            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <select
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                            >
                                <option value="">All Types</option>
                                {uniqueTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Results Info */}
                    <div className="flex justify-between items-center">
                        <p className="text-gray-600">
                            Showing {filteredJobs.length} of {jobs.length} jobs
                        </p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setLocationFilter('');
                                setTypeFilter('');
                            }}
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                        >
                            <Filter className="h-4 w-4" />
                            Clear Filters
                        </button>
                    </div>
                </div>

                {/* Jobs Grid */}
                {filteredJobs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredJobs.map((job) => (
                            <JobCard
                                key={job._id}
                                jobId={job._id}
                                companyInitial={job.company?.charAt(0) || 'C'}
                                companyColor="bg-blue-500"
                                jobTitle={job.title}
                                company={job.company}
                                location={job.location}
                                type={job.type}
                                description={job.description}
                                tags={job.tags || job.requirements || []}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No jobs found</h3>
                        <p className="text-gray-600 mb-6">
                            Try adjusting your search criteria or filters
                        </p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setLocationFilter('');
                                setTypeFilter('');
                            }}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Clear All Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}