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

    // Use real jobs data or fallback to empty array
    const displayJobs = jobs.length > 0 ? jobs : [];

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <Hero />

            {/* Categories */}
            <section className="px-6 md:px-12 lg:px-24 py-16">
                <SectionHeader title="Explore by category" linkText="View All Categories →" linkTo="/jobs" />
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
                <SectionHeader title="Featured jobs" linkText="View All Jobs →" linkTo="/jobs" />
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
            </section>

            {/* Latest Jobs */}
            <section className="px-6 md:px-12 lg:px-24 py-16 bg-gray-50">
                <SectionHeader title="Latest jobs" linkText="View All Jobs →" linkTo="/jobs" />
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