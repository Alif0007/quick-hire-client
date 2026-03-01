export default function CategoryCard({
    icon = "✖",          // ← replace with your actual icon (emoji, lucide-react, heroicons, etc.)
    title = "Design",
    jobCount = 235,
    color = "blue"       // you can pass "purple", "green", etc. to change accent
}) {
    // Optional: map color to tailwind classes


    return (
        <div
            className={`
          flex flex-row lg:flex-col gap-5
          group relative 
          p-6 md:p-8 
          bg-white 
          border border-gray-200 
          hover:shadow-md 
          hover:text-white 
          hover:bg-[#4033c9] 
          transition-all duration-200 
          cursor-pointer
          overflow-hidden
        `}
        >
            {/* Icon */}
            <div className="mb-5 text-4xl md:text-5xl opacity-90">
                {icon}
            </div>
            <div>
                {/* Title */}
                <h3 className="
          text-2xl md:text-3xl 
          font-bold 
          tracking-tight 
          mb-2
        ">
                    {title}
                </h3>

                {/* Jobs count + arrow */}
                <div className="flex items-center justify-between">
                    <p className="
            text-base md:text-lg 
            font-medium 
            text-gray-500 
            group-hover:text-gray-700 
            transition-colors
          ">
                        {jobCount} jobs available
                    </p>

                    <span className={`
            text-xl md:text-2xl 
            font-bold 
            ml-40 lg:ml-20
            opacity-70 group-hover:opacity-100 
            transition-all duration-200
            transform group-hover:translate-x-1
          `}>
                        →
                    </span>
                </div>
            </div>


            {/* Optional subtle hover overlay */}
            <div className="
          absolute inset-0 
          bg-gradient-to-br from-transparent via-transparent to-blue-50/30 
          opacity-0 group-hover:opacity-100 
          transition-opacity duration-300 
          rounded-2xl 
          pointer-events-none
        "></div>
        </div>
    );
}