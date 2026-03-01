// API service to handle communication with the backend
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false,
});

// Fetch all jobs
export const fetchJobs = async () => {
    try {
        const response = await apiClient.get('/jobs');
        return response.data;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        throw error;
    }
};

// Fetch a single job by ID
export const fetchJobById = async (id) => {
    try {
        const response = await apiClient.get(`/jobs/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching job:', error);
        throw error;
    }
};

// Submit a job application
export const submitApplication = async (applicationData) => {
    try {
        const response = await apiClient.post('/applications', applicationData);
        return response.data;
    } catch (error) {
        console.error('Error submitting application:', error);
        throw error;
    }
};

// Fetch all applications (admin only)
export const fetchApplications = async () => {
    try {
        const response = await apiClient.get('/applications');
        return response.data;
    } catch (error) {
        console.error('Error fetching applications:', error);
        throw error;
    }
};

// Add a new job (admin only)
export const addJob = async (jobData) => {
    try {
        const response = await apiClient.post('/jobs', jobData);
        return response.data;
    } catch (error) {
        console.error('Error adding job:', error);
        throw error;
    }
};

// Delete a job (admin only)
export const deleteJob = async (id) => {
    try {
        const response = await apiClient.delete(`/jobs/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting job:', error);
        throw error;
    }
};

// Delete an application (admin only)
export const deleteApplication = async (id) => {
    try {
        const response = await apiClient.delete(`/applications/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting application:', error);
        throw error;
    }
};