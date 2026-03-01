// src/components/JobCard.jsx
import React from 'react';

export default function LatestJobCard({
    logoBg = "bg-emerald-500",
    logoText = "N",
    jobTitle = "Social Media Assistant",
    company = "Nomad",
    location = "Paris, France",
    type = "Full-Time",
    tags = ["Marketing", "Design"],
}) {
    return (
        <div className="
      bg-white 
      border border-gray-200 
      rounded-xl 
      p-5 md:p-6 
      hover:shadow-md 
      hover:border-gray-300 
      transition-all duration-200 
      group
      relative
      overflow-hidden
    ">
            {/* Logo + Title + Company/Location */}
            <div className="flex items-start gap-4 mb-4">
                {/* Company logo/initial */}
                <div className={`
          w-12 h-12 md:w-14 md:h-14 
          ${logoBg} 
          rounded-lg 
          flex items-center justify-center 
          text-white 
          font-bold 
          text-2xl md:text-3xl 
          flex-shrink-0
          shadow-sm
        `}>
                    {logoText}
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="
            text-xl md:text-2xl 
            font-semibold 
            text-gray-900 
            mb-1.5 
            leading-tight
          ">
                        {jobTitle}
                    </h3>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-gray-600">
                        <span className="font-medium">{company}</span>
                        <span className="hidden sm:inline text-gray-400">•</span>
                        <span>{location}</span>
                    </div>
                </div>
            </div>

            {/* Tags / Badges row */}
            <div className="flex flex-wrap items-center gap-2.5 mt-3">
                {/* Full-Time badge */}
                <span className="
          px-3.5 py-1.5 
          bg-teal-50 
          text-teal-700 
          text-sm 
          font-medium 
          rounded-full 
          border border-teal-100
        ">
                    {type}
                </span>

                {/* Other tags */}
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className={`
              px-3.5 py-1.5 
              ${index === 0
                                ? 'bg-orange-50 text-orange-700 border-orange-100'
                                : 'bg-purple-50 text-purple-700 border-purple-100'
                            } 
              text-sm 
              font-medium 
              rounded-full 
              border
            `}
                    >
                        {tag}
                    </span>
                ))}
            </div>


        </div>
    );
}