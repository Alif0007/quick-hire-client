// src/components/HeroSection.jsx
import React from 'react';
import rightPhoto from '../../assets/849d976651c585cf41e864d6b53eba0a93aec63f.png'
import underline from '../../assets/image1.png'
import imageBg from '../../assets/image2.png'



export default function HeroSection() {
    return (
        <section className="relative bg-white min-h-screen overflow-hidden">
            {/* Subtle geometric background */}
            <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
                <img
                    src="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=2000"
                    alt="abstract geometric background"
                    className="w-full h-full object-cover"
                />
            </div>




            {/* Main hero content */}
            <div className="relative z-10 container mx-auto px-6 md:px-10 lg:px-16 pt-12 md:pt-20 lg:pt-28  flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
                {/* Left - Text content */}
                <div className="w-full lg:w-1/2 text-left">
                    <h1 className=" text-7xl font-extrabold text-gray-900 leading-tight tracking-tight">
                        Discover
                        <br />
                        more than
                        <br />
                        <span className="text-blue-600">5000+</span> Jobs
                    </h1>
                    <div>
                        <img src={underline} alt="" />
                    </div>

                    <p className="mt-6 md:mt-8 text-lg md:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                        Great platform for the job seeker that searching for
                        new career heights and passionate about startups.
                    </p>

                    {/* Search form */}
                    <div className="mt-10 md:mt-12 max-w-3xl mx-auto lg:mx-0">
                        <div className="flex flex-col sm:flex-row gap-4 bg-white rounded-xl shadow-lg p-3 md:p-4 border border-gray-200">
                            <div className="flex-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <span className="text-gray-400 text-xl">🔍</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Job title or keyword"
                                    className="w-full pl-12 pr-4 py-4 border-b border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                                />
                            </div>
                            <div className="flex-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <span className="text-gray-400 text-xl">📍</span>
                                </div>
                                <select
                                    className="w-full pl-12 pr-10 py-4 border-b border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700"
                                >
                                    <option>Florence, Italy</option>
                                    <option>Remote</option>
                                    <option>New York, USA</option>
                                    <option>London, UK</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            <button className="w-full sm:w-auto px-10 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                                Search my job
                            </button>
                        </div>
                    </div>

                    {/* Popular tags */}
                    <div className="mt-8 text-center lg:text-left">
                        <p className="text-gray-600">
                            Popular:{' '}
                            <span className="text-blue-600 font-medium">
                                UI Designer, UX Researcher, Android, Admin
                            </span>
                        </p>
                    </div>
                </div>

                {/* Right - Image */}
                <div className="w-full hidden md:block lg:w-5/12 relative mt-10 lg:mt-0">
                    <div className="relative z-30">

                        <img
                            src={rightPhoto}
                            alt="Smiling man with glasses pointing to side"
                            className="w-full h-auto object-cover aspect-[4/5] lg:aspect-[3/4]"
                        />

                    </div>

                    {/* Decorative underline / arrow doodle */}
                    <div className="absolute top-0  z-0 scale-150">
                        <img src={imageBg} alt="" />
                    </div>
                </div>
            </div>

            {/* Companies we helped grow */}
            <div className="relative z-10   pb-12 px-6 bg-white pt-8">
                <p className="text-gray-500 uppercase tracking-widest text-sm md:text-base font-medium pl-5">
                    Companies we helped grow
                </p>
                <div className="mt-8 flex flex-wrap justify-around items-center gap-10 md:gap-16 opacity-80">
                    <span className="text-5xl md:text-6xl font-bold text-gray-400">Vodafone</span>
                    <span className="text-5xl md:text-6xl font-bold text-gray-400">Intel</span>
                    <span className="text-5xl md:text-6xl font-bold text-gray-400">TESLA</span>
                    <span className="text-5xl md:text-6xl font-bold text-gray-400">AMD</span>
                    <span className="text-5xl md:text-6xl font-bold text-gray-400">Talkit</span>
                </div>
            </div>
        </section>
    );
}