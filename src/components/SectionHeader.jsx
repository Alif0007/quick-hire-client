import { Link } from 'react-router-dom';

export default function SectionHeader({ title, linkText = "Show all jobs →", linkTo = "/jobs" }) {
    return (
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-playfair">{title}</h2>
            <Link to={linkTo} className="text-blue-600 hover:underline font-medium font-epilogue">
                {linkText}
            </Link>
        </div>
    );
}