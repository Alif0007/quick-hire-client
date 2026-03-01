import logo from "../../assets/logo.png";

export default function Footer() {
    return (
        <footer className="bg-slate-950 text-gray-300">
            {/* Main content */}
            <div className="container mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12">
                    {/* Logo + Description column */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10">
                                <img src={logo} alt="" />
                            </div>
                            <span className="text-2xl font-bold text-white tracking-tight">QuickHire</span>
                        </div>

                        <p className="text-gray-400 leading-relaxed max-w-xs">
                            Great platform for the job seeker that passionate about startups.
                            Find your dream job easier.
                        </p>
                    </div>

                    {/* About column */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-5">About</h3>
                        <ul className="space-y-3 text-gray-400">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Companies</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Terms</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Advice</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Resources column */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-5">Resources</h3>
                        <ul className="space-y-3 text-gray-400">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Help Docs</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Guide</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Updates</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Newsletter column */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-5">Get job notifications</h3>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            The latest job news, articles, sent to your inbox weekly.
                        </p>

                        <form className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="
                  flex-1 px-5 py-3 
                  border border-slate-700 
                  placeholder-gray-500 
                  text-black
                  focus:outline-none 
                  focus:border-blue-500 
                  focus:ring-1 
                  focus:ring-blue-500
                "
                                required
                            />
                            <button
                                type="submit"
                                className="
                  px-6 py-3 
                  bg-blue-600 
                  hover:bg-blue-700 
                  text-white 
                  font-medium 
                  transition-colors 
                  shadow-sm
                "
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-slate-800">
                <div className="container mx-auto px-6 md:px-10 lg:px-16 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
                    <div>
                        © 2021 @ QuickHire. All rights reserved.
                    </div>

                    {/* Social icons */}
                    <div className="flex items-center gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-blue-400 transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                            </svg>
                        </a>
                        <a href="#" className="hover:text-blue-400 transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.228.228 2.695.072 7.053.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.156 4.358 2.623 6.825 6.981 6.981C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.358-.156 6.825-2.623 6.981-6.981.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.947-.156-4.358-2.623-6.825-6.981-6.981C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.881 0 1.44 1.44 0 012.881 0z" />
                            </svg>
                        </a>
                        <a href="#" className="hover:text-blue-400 transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.029-3.058-1.867-3.058-1.867 0-2.152 1.459-2.152 2.966v5.696h-3v-11h2.882v1.509h.039c.401-.757 1.381-1.557 2.837-1.557 3.033 0 3.596 1.997 3.596 4.597v6.451z" />
                            </svg>
                        </a>
                        <a href="#" className="hover:text-blue-400 transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.326 3.608 1.301.975.975 1.239 2.242 1.301 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.326 2.633-1.301 3.608-.975.975-2.242 1.239-3.608 1.301-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.326-3.608-1.301-.975-.975-1.239-2.242-1.301-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.326-2.633 1.301-3.608.975-.975 2.242-1.239 3.608-1.301 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-2.062.094-3.791.998-5.229 2.436-1.438 1.438-2.342 3.167-2.436 5.229-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.094 2.062.998 3.791 2.436 5.229 1.438 1.438 3.167 2.342 5.229 2.436 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c2.062-.094 3.791-.998 5.229-2.436 1.438-1.438 2.342-3.167 2.436-5.229.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.094-2.062-.998-3.791-2.436-5.229-1.438-1.438-3.167-2.342-5.229-2.436-1.28-.058-1.688-.072-4.947-.072z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}