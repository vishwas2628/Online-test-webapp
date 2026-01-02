import { Link } from 'react-router-dom';
import { FiCheckCircle, FiServer, FiDatabase, FiLayout, FiCode } from 'react-icons/fi';

const About = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="relative bg-primary-900 py-24 sm:py-32">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
                        alt=""
                        className="h-full w-full object-cover object-center"
                    />
                </div>
                <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-heading font-bold tracking-tight text-white sm:text-6xl">About ExamSphere</h1>
                    <p className="mt-6 text-lg leading-8 text-gray-300 max-w-3xl mx-auto">
                        Empowering education through secure digital assessment.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-heading mb-6">
                            Digitizing the Future of Examinations
                        </h2>
                        <div className="text-lg leading-8 text-gray-600 space-y-6">
                            <p>
                                ExamSphere is a full-stack web-based online test-taking application developed using the MERN (MongoDB, Express, React, Node.js) technology stack. The platform is designed to digitize and automate the entire examination lifecycle, ensuring accuracy, efficiency, and security.
                            </p>
                            <p>
                                Traditional examination systems involve manual question preparation, paper-based tests, time-consuming evaluation, and delayed result processing. ExamSphere eliminates these limitations by offering an intelligent online solution that allows teachers to create and evaluate tests digitally while enabling students to attempt exams remotely with real-time monitoring.
                            </p>
                        </div>

                        <div className="mt-10 border-l-4 border-primary-500 pl-6 italic text-gray-700 text-lg">
                            “Education is the most powerful weapon which you can use to change the world.” – Nelson Mandela
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">The Team Behind ExamSphere</h3>
                        <div className="space-y-6">
                            <div>
                                <p className="font-semibold text-lg text-primary-600">Developed By</p>
                                <ul className="mt-2 space-y-1 text-gray-700">
                                    <li className="flex items-center"><FiCheckCircle className="text-green-500 mr-2" /> Vishwas Chourasiya</li>
                                    <li className="flex items-center"><FiCheckCircle className="text-green-500 mr-2" /> Arun Kumar Pandey</li>
                                    <li className="flex items-center"><FiCheckCircle className="text-green-500 mr-2" /> Satyam Pyasi</li>
                                </ul>
                            </div>
                            <div className="pt-6 border-t border-gray-100">
                                <p className="text-sm text-gray-500">MCA 3rd Semester</p>
                                <p className="text-sm font-semibold text-gray-900">Shri Ram Institute of Technology</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vision & Mission */}
                <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-primary-50 p-8 rounded-2xl border border-primary-100">
                        <h3 className="text-2xl font-bold text-primary-900 mb-4">🎯 Our Vision</h3>
                        <p className="text-gray-700 leading-relaxed">
                            To create a reliable and scalable digital examination ecosystem that supports modern education and remote learning, bridging the gap between traditional methods and technological advancement.
                        </p>
                    </div>
                    <div className="bg-secondary-50 p-8 rounded-2xl border border-secondary-100">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">🚀 Our Mission</h3>
                        <p className="text-gray-700 leading-relaxed">
                            To simplify online assessments by delivering secure, automated, and user-friendly examination tools for students and educators, making evaluation fair and instant.
                        </p>
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="mt-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-heading">
                            Built With Modern Technology
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">We use the latest tools to ensure specialized performance and security.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center hover:-translate-y-1 transition-transform">
                            <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <FiLayout className="h-6 w-6" />
                            </div>
                            <h3 className="font-bold text-gray-900">Frontend</h3>
                            <p className="text-sm text-gray-600 mt-2">React.js & Tailwind CSS</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center hover:-translate-y-1 transition-transform">
                            <div className="h-12 w-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <FiServer className="h-6 w-6" />
                            </div>
                            <h3 className="font-bold text-gray-900">Backend</h3>
                            <p className="text-sm text-gray-600 mt-2">Node.js & Express.js</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center hover:-translate-y-1 transition-transform">
                            <div className="h-12 w-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <FiDatabase className="h-6 w-6" />
                            </div>
                            <h3 className="font-bold text-gray-900">Database</h3>
                            <p className="text-sm text-gray-600 mt-2">MongoDB</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center hover:-translate-y-1 transition-transform">
                            <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <FiCode className="h-6 w-6" />
                            </div>
                            <h3 className="font-bold text-gray-900">Authentication</h3>
                            <p className="text-sm text-gray-600 mt-2">JWT & bcrypt.js</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
