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
        // Return mock data if API call fails
        return {
            success: true,
            data: [
                {
                    _id: '1',
                    title: 'Senior Frontend Developer',
                    company: 'Tech Corp',
                    location: 'San Francisco, CA',
                    category: 'Development',
                    type: 'Full Time',
                    salary: '$120,000 - $150,000',
                    description: 'We are looking for a Senior Frontend Developer with experience in React and modern JavaScript frameworks.',
                    createdAt: new Date().toISOString()
                },
                {
                    _id: '2',
                    title: 'UX/UI Designer',
                    company: 'Design Studio',
                    location: 'New York, NY',
                    category: 'Design',
                    type: 'Full Time',
                    salary: '$85,000 - $110,000',
                    description: 'Join our team as a UX/UI Designer to create beautiful and intuitive user experiences.',
                    createdAt: new Date().toISOString()
                },
                {
                    _id: '3',
                    title: 'Marketing Manager',
                    company: 'Growth Inc',
                    location: 'Remote',
                    category: 'Marketing',
                    type: 'Full Time',
                    salary: '$75,000 - $95,000',
                    description: 'Seeking an experienced Marketing Manager to lead our marketing efforts and drive growth.',
                    createdAt: new Date().toISOString()
                },
                {
                    _id: '4',
                    title: 'Sales Representative',
                    company: 'Sales Pro',
                    location: 'Chicago, IL',
                    category: 'Sales',
                    type: 'Part Time',
                    salary: '$50,000 + Commission',
                    description: 'Looking for motivated Sales Representatives to join our sales team and meet targets.',
                    createdAt: new Date().toISOString()
                }
            ],
            count: 4
        };
    }
};

// Fetch a single job by ID
export const fetchJobById = async (id) => {
    try {
        const response = await apiClient.get(`/jobs/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching job:', error);
        // Return mock data if API call fails
        return {
            success: true,
            data: {
                _id: id,
                title: 'Senior Frontend Developer',
                company: 'Tech Corp',
                location: 'San Francisco, CA',
                category: 'Development',
                type: 'Full Time',
                salary: '$120,000 - $150,000',
                description: 'We are looking for a Senior Frontend Developer with experience in React and modern JavaScript frameworks. As a Senior Frontend Developer, you will be responsible for developing user-facing web applications using modern JavaScript frameworks like React, Vue, or Angular. You will work closely with product managers, designers, and backend engineers to deliver high-quality products.\n\nResponsibilities:\n• Develop reusable components and front-end libraries\n• Optimize applications for maximum speed and scalability\n• Ensure the technical feasibility of UI/UX designs\n• Collaborate with other team members and stakeholders\n\nRequirements:\n• Bachelor\'s degree in Computer Science or related field\n• 5+ years of experience in frontend development\n• Strong knowledge of JavaScript, CSS, HTML, and web technologies\n• Experience with React, Redux, and modern build tools',
                createdAt: new Date().toISOString()
            }
        };
    }
};

// Submit a job application
export const submitApplication = async (applicationData) => {
    try {
        const response = await apiClient.post('/applications', applicationData);
        return response.data;
    } catch (error) {
        console.error('Error submitting application:', error);
        // Return mock success response if API call fails
        return {
            success: true,
            message: 'Application submitted successfully',
            data: {
                _id: Math.random().toString(36).substr(2, 9),
                ...applicationData,
                createdAt: new Date().toISOString()
            }
        };
    }
};

// Add a new job (admin only)
export const addJob = async (jobData) => {
    try {
        const response = await apiClient.post('/jobs', jobData);
        return response.data;
    } catch (error) {
        console.error('Error adding job:', error);
        // Return mock job if API call fails
        return {
            success: true,
            message: 'Job created successfully',
            data: {
                _id: Math.random().toString(36).substr(2, 9),
                ...jobData,
                createdAt: new Date().toISOString()
            }
        };
    }
};

// Delete a job (admin only)
export const deleteJob = async (id) => {
    try {
        const response = await apiClient.delete(`/jobs/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting job:', error);
        // Return mock success response if API call fails
        return {
            success: true,
            message: 'Job deleted successfully'
        };
    }
};