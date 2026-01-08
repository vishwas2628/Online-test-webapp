import { Link } from 'react-router-dom';
import { FiCheckCircle, FiShield, FiTrendingUp, FiClock, FiUsers, FiSmartphone } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Landing = () => {
    const { user } = useAuth();

    return (
        <div className="relative">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-gray-900 pt-20 pb-20 sm:pb-24 lg:pt-32">
                <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2830&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
                    alt=""
                    className="absolute inset-0 -z-10 h-full w-full object-cover"
                />

                <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-heading font-bold tracking-tight text-white sm:text-6xl animate-fade-in-up">
                            Transform the Way <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-primary-400">Exams Are Conducted</span>
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-300 animate-fade-in-up animation-delay-2000">
                            ExamSphere is a modern, web-based online test-taking platform that simplifies examination management for teachers and delivers a seamless test experience for students—anytime, anywhere.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6 animate-fade-in-up animation-delay-4000 flex-wrap gap-y-4">
                            {user ? (
                                <Link
                                    to={user.role === 'teacher' ? '/teacher' : '/student'}
                                    className="rounded-full bg-primary-600 px-8 py-3.5 text-lg font-semibold text-white shadow-lg shadow-primary-500/30 hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 transition-transform transform hover:-translate-y-1"
                                >
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        to="/register"
                                        className="rounded-full bg-secondary-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-secondary-500/30 hover:bg-secondary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-400 transition-transform transform hover:-translate-y-1"
                                    >
                                        Get Started
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="rounded-full bg-white/10 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/20 border border-white/20 backdrop-blur-sm transition-transform transform hover:-translate-y-1"
                                    >
                                        Login as Student
                                    </Link>
                                    <Link
                                        to="/login" // Assuming same login page for now, role selection handles it
                                        className="text-sm font-semibold leading-6 text-white hover:text-secondary-300 transition-colors"
                                    >
                                        Login as Teacher <span aria-hidden="true">→</span>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Trust & Value Section */}
            <div className="bg-white py-16 sm:py-20 border-b border-gray-100">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-base font-semibold leading-7 text-primary-600">Built for Excellence</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-heading">
                            Designed for Accuracy, Security, and Ease of Use
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            In today’s digital education ecosystem, institutions need reliable and scalable examination solutions. ExamSphere bridges the gap between traditional exams and modern technology by providing an intelligent online assessment system that ensures fairness, transparency, and performance.
                        </p>
                    </div>
                </div>
            </div>

            {/* Key Features Section */}
            <div className="bg-gray-50 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center mb-16">
                        <h2 className="text-base font-semibold leading-7 text-primary-600">Feature Rich</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-heading">
                            Powerful Features That Make ExamSphere Stand Out
                        </p>
                    </div>
                    <div className="mx-auto max-w-2xl lg:max-w-none">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                            {/* Feature 1 */}
                            <div className="flex flex-col transform hover:scale-105 transition-transform duration-300">
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                                    <div className="h-10 w-10 rounded-lg bg-primary-600 flex items-center justify-center">
                                        <FiShield className="h-6 w-6 text-white" />
                                    </div>
                                    Secure Authentication
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 pl-14">
                                    <p className="flex-auto">Role-based access with JWT ensures only authorized users can access protected features. Passwords are encrypted using industry-standard hashing.</p>
                                </dd>
                            </div>
                            {/* Feature 2 */}
                            <div className="flex flex-col transform hover:scale-105 transition-transform duration-300">
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                                    <div className="h-10 w-10 rounded-lg bg-primary-600 flex items-center justify-center">
                                        <FiClock className="h-6 w-6 text-white" />
                                    </div>
                                    Real-Time Countdown
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 pl-14">
                                    <p className="flex-auto">Each test includes a live countdown timer that tracks remaining time and automatically submits the test once time expires.</p>
                                </dd>
                            </div>
                            {/* Feature 3 */}
                            <div className="flex flex-col transform hover:scale-105 transition-transform duration-300">
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                                    <div className="h-10 w-10 rounded-lg bg-primary-600 flex items-center justify-center">
                                        <FiUsers className="h-6 w-6 text-white" />
                                    </div>
                                    Teacher & Student Dashboards
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 pl-14">
                                    <p className="flex-auto">Dedicated dashboards for Teachers to manage tests and Students to attempt them, providing a tailored experience for each role.</p>
                                </dd>
                            </div>
                            {/* Feature 4 */}
                            <div className="flex flex-col transform hover:scale-105 transition-transform duration-300">
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                                    <div className="h-10 w-10 rounded-lg bg-primary-600 flex items-center justify-center">
                                        <FiTrendingUp className="h-6 w-6 text-white" />
                                    </div>
                                    Automated Evaluation
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 pl-14">
                                    <p className="flex-auto">Objective-type questions are evaluated automatically, reducing manual workload and human error, delivering instant results.</p>
                                </dd>
                            </div>
                            {/* Feature 5 */}
                            <div className="flex flex-col transform hover:scale-105 transition-transform duration-300">
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                                    <div className="h-10 w-10 rounded-lg bg-primary-600 flex items-center justify-center">
                                        <FiSmartphone className="h-6 w-6 text-white" />
                                    </div>
                                    Fully Responsive Design
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 pl-14">
                                    <p className="flex-auto">Optimized for desktops, tablets, and mobile devices using React and Tailwind CSS, ensuring accessibility from anywhere.</p>
                                </dd>
                            </div>
                            {/* Feature 6 */}
                            <div className="flex flex-col transform hover:scale-105 transition-transform duration-300">
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                                    <div className="h-10 w-10 rounded-lg bg-primary-600 flex items-center justify-center">
                                        <FiCheckCircle className="h-6 w-6 text-white" />
                                    </div>
                                    Instant Analytics
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 pl-14">
                                    <p className="flex-auto">Get detailed performance reports immediately after test submission, helping students understand their strengths and areas for improvement.</p>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-heading">
                            Simple Workflow. Powerful Results.
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* For Teachers */}
                        <div className="bg-primary-50 p-8 rounded-2xl border border-primary-100">
                            <h3 className="text-2xl font-bold text-primary-900 mb-6 flex items-center">
                                <span className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">T</span>
                                For Teachers
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-primary-600 text-white font-bold text-xs mr-3 mt-0.5">1</span>
                                    <span className="text-gray-700">Register or log in securely to the dashboard.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-primary-600 text-white font-bold text-xs mr-3 mt-0.5">2</span>
                                    <span className="text-gray-700">Create tests with multiple-choice questions and set time limits.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-primary-600 text-white font-bold text-xs mr-3 mt-0.5">3</span>
                                    <span className="text-gray-700">Schedule test availability and assign to students.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-primary-600 text-white font-bold text-xs mr-3 mt-0.5">4</span>
                                    <span className="text-gray-700">Monitor student attempts and view instant results.</span>
                                </li>
                            </ul>
                        </div>
                        {/* For Students */}
                        <div className="bg-secondary-50 p-8 rounded-2xl border border-secondary-100">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                <span className="bg-secondary-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">S</span>
                                For Students
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-secondary-600 text-white font-bold text-xs mr-3 mt-0.5">1</span>
                                    <span className="text-gray-700">Register or log in to view your student portal.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-secondary-600 text-white font-bold text-xs mr-3 mt-0.5">2</span>
                                    <span className="text-gray-700">Browse available and upcoming tests assigned to you.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-secondary-600 text-white font-bold text-xs mr-3 mt-0.5">3</span>
                                    <span className="text-gray-700">Attempt tests with a live countdown timer tracking progress.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-secondary-600 text-white font-bold text-xs mr-3 mt-0.5">4</span>
                                    <span className="text-gray-700">Submit and receive immediate feedback on your performance.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Motivation Quote Section */}
            <div className="bg-primary-900 py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center relative z-10">
                    <blockquote className="text-2xl font-semibold italic text-white sm:text-3xl font-heading">
                        “When technology meets education, learning becomes limitless.”
                    </blockquote>
                </div>
            </div>
        </div>
    );
};

export default Landing;
