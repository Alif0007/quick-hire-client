export default function SectionHeader({ title, linkText = "Show all jobs →" }) {
    return (
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h2>
            <a href="#" className="text-blue-600 hover:underline font-medium">
                {linkText}
            </a>
        </div>
    );
}