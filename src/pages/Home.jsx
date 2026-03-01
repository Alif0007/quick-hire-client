import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import SectionHeader from '../components/SectionHeader';
import CategoryCard from '../components/CategoryCard';
import JobCard from '../components/JobCard';
import Footer from '../components/Footer';
import { fetchJobs } from '../services/api';
import LatestJobCard from '../components/LatestJobCard';

// Mock data (later replace with API fetch)
const categories = [
    { icon: '✏️', title: 'Design', jobs: 235 },
    { icon: '📈', title: 'Sales', jobs: 756 },
    { icon: '📣', title: 'Marketing', jobs: 140 },
    { icon: '💰', title: 'Finance', jobs: 325 },
    { icon: '💻', title: 'Technology', jobs: 436 },
    { icon: '</>', title: 'Engineering', jobs: 542 },
    { icon: '💼', title: 'Business', jobs: 211 },
    { icon: '👥', title: 'Human Resource', jobs: 346 },
];

const mockJobs = [
    {
        jobId: '1',
        logo: { text: 'R', bg: 'bg-red-500' },
        company: 'Revolut',
        title: 'Email Marketing',
        location: 'Madrid, Spain',
        type: 'Full Time',
        tags: ['Marketing', 'Design'],
        description: 'Revolut is looking for Email Marketing to help team...',
    },
    {
        jobId: '2',
        logo: { text: 'N', bg: 'bg-blue-500' },
        company: 'Netflix',
        title: 'Senior UX Designer',
        location: 'Los Angeles, USA',
        type: 'Full Time',
        tags: ['Design', 'UI/UX'],
        description: 'Join our design team to create amazing user experiences...',
    },
    {
        jobId: '3',
        logo: { text: 'A', bg: 'bg-green-500' },
        company: 'Airbnb',
        title: 'Frontend Developer',
        location: 'San Francisco, USA',
        type: 'Full Time',
        tags: ['Development', 'React'],
        description: 'Build the future of travel experiences with our frontend team...',
    },
    {
        jobId: '4',
        logo: { text: 'G', bg: 'bg-purple-500' },
        company: 'Google',
        title: 'Product Manager',
        location: 'Mountain View, USA',
        type: 'Full Time',
        tags: ['Product', 'Management'],
        description: 'Lead product development for our next generation platform...',
    },
    {
        jobId: '5',
        logo: { text: 'M', bg: 'bg-yellow-500' },
        company: 'Meta',
        title: 'Data Scientist',
        location: 'New York, USA',
        type: 'Full Time',
        tags: ['Data', 'Analytics'],
        description: 'Analyze user behavior and drive data-informed decisions...',
    },
    {
        jobId: '6',
        logo: { text: 'S', bg: 'bg-indigo-500' },
        company: 'Spotify',
        title: 'Backend Engineer',
        location: 'Stockholm, Sweden',
        type: 'Full Time',
        tags: ['Backend', 'Node.js'],
        description: 'Build scalable backend services for millions of users...',
    },
    {
        jobId: '7',
        logo: { text: 'T', bg: 'bg-pink-500' },
        company: 'Tesla',
        title: 'AI Researcher',
        location: 'Palo Alto, USA',
        type: 'Full Time',
        tags: ['AI', 'Research'],
        description: 'Push the boundaries of artificial intelligence for autonomous vehicles...',
    },
    {
        jobId: '8',
        logo: { text: 'A', bg: 'bg-teal-500' },
        company: 'Amazon',
        title: 'Cloud Solutions Architect',
        location: 'Seattle, USA',
        type: 'Full Time',
        tags: ['Cloud', 'AWS'],
        description: 'Design and implement cloud infrastructure solutions...',
    },
];

export default function Home() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadJobs = async () => {
            try {
                setLoading(true);
                const response = await fetchJobs();
                // Handle both direct array and {success: true, data: [...]} structures
                let jobsData;
                if (Array.isArray(response)) {
                    jobsData = response;
                } else if (response && response.data && Array.isArray(response.data)) {
                    jobsData = response.data;
                } else {
                    jobsData = [];
                }
                setJobs(jobsData);
            } catch (err) {
                setError('Failed to load jobs');
                console.error('Error loading jobs:', err);
            } finally {
                setLoading(false);
            }
        };

        loadJobs();
    }, []);

    // Use real jobs data or fallback to mock data
    const displayJobs = jobs.length > 0 ? jobs : mockJobs;

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <Hero />

            {/* Categories */}
            <section className="px-6 md:px-12 lg:px-24 py-16">
                <SectionHeader title="Explore by category" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat) => (
                        <CategoryCard
                            key={cat.title}
                            icon={cat.icon}
                            title={cat.title}
                            jobsCount={cat.jobs}
                        />
                    ))}
                </div>
            </section>

            {/* Featured Jobs */}
            <section className="px-6 md:px-12 lg:px-24 py-16 bg-white">
                <SectionHeader title="Featured jobs" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {displayJobs.slice(0, 8).map((job, i) => (
                        <JobCard
                            key={job._id || i}
                            jobId={job._id}
                            companyInitial={job.company?.charAt(0) || 'C'}
                            companyColor="bg-blue-500"
                            jobTitle={job.title}
                            company={job.company}
                            location={job.location}
                            type={job.type}
                            salary={job.salary}
                            description={job.description}
                            tags={job.tags || job.requirements || []}
                        />
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Link
                        to="/jobs"
                        className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
                    >
                        View All Jobs
                    </Link>
                </div>
            </section>

            {/* Latest Jobs */}
            <section className="px-6 md:px-12 lg:px-24 py-16 bg-gray-50">
                <SectionHeader title="Latest jobs" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {displayJobs.map((job, i) => (
                        <LatestJobCard
                            key={`latest-${job._id || i}`}
                            jobId={job._id}
                            logo={{ text: job.company?.charAt(0) || 'C', bg: 'bg-blue-500' }}
                            company={job.company}
                            title={job.title}
                            location={job.location}
                            type={job.type}
                            tags={job.tags || job.requirements || []}
                            description={job.description}
                        />
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}