// src/components/JobCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function JobCard({
    jobId,
    companyInitial = "R",
    companyColor = "bg-red-500",
    jobTitle = "Email Marketing",
    company = "Revolut",
    location = "Madrid, Spain",
    type = "Full Time",
    salary = "",
    description = "Revolut is looking for Email Marketing to help team ma...",
    tags = ["Marketing", "Design"],
}) {
    return (
        <Link
            to={`/job/${jobId}`}
            className="
      relative 
      bg-white 
      border border-blue-200 
      block
      p-5 md:p-6 
      hover:shadow-lg 
      hover:border-gray-300 
      transition-all duration-200 
      group
      cursor-pointer
    "
        >
            {/* Full Time badge - top right */}
            <div className="
        absolute 
        top-6 right-4 
        px-3 py-2  
        text-blue-700 
        text-xs 
        font-medium 
        border border-blue-200
      ">
                {type}
            </div>

            {/* Logo + Title + Company/Location */}
            <div className="flex flex-col items-start gap-4 mb-4">
                {/* Company initial square */}
                <div className={`
          w-12 h-12 md:w-14 md:h-14 
          ${companyColor} 
          rounded-lg 
          flex items-center justify-center 
          text-white 
          font-bold 
          text-xl md:text-2xl 
          flex-shrink-0
          shadow-sm
        `}>
                    {companyInitial}
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="
            text-lg md:text-xl 
            font-semibold 
            text-gray-900 
            mb-1 
            line-clamp-1
          ">
                        {jobTitle}
                    </h3>

                    <p className="
            text-sm md:text-base 
            text-gray-600 
            mb-1
          ">
                        {company} • {location}
                        {salary && (
                            <span className="block text-green-600 font-medium">
                                {salary}
                            </span>
                        )}
                    </p>
                </div>
            </div>

            {/* Description */}
            <p className="
        text-sm md:text-base 
        text-gray-600 
        mb-5 
        line-clamp-2
      ">
                {description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="
              px-3 py-1 
              bg-orange-50 
              text-orange-700 
              text-xs 
              font-medium 
              rounded-full 
              border border-orange-200/70
            "
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Subtle hover overlay */}
            <div className="
        absolute inset-0 
        bg-gradient-to-br from-transparent via-transparent to-blue-50/20 
        opacity-0 group-hover:opacity-100 
        transition-opacity duration-300 
        pointer-events-none
        rounded-xl
      "></div>
        </Link>
    );
}