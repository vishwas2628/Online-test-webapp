import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
            <div className="max-w-3xl bg-white p-8 rounded-lg shadow-lg mt-10">
                <h1 className="text-3xl font-bold mb-4 text-blue-600">About Us</h1>
                <p className="text-gray-700 mb-4 leading-relaxed">
                    The Online Test Tracking Web Application is a state-of-the-art platform designed to streamline the examination process.
                    Built with the MERN stack (MongoDB, Express, React, Node.js), it offers a seamless experience for both teachers and students.
                </p>
                <h2 className="text-xl font-bold mb-2">Key Features</h2>
                <ul className="list-disc list-inside text-gray-700 mb-4">
                    <li>Secure Role-based Assessment</li>
                    <li>Real-time Countdown Timer</li>
                    <li>Instant Result Generation</li>
                    <li>Comprehensive Teacher Dashboards</li>
                </ul>
                <h2 className="text-xl font-bold mb-2">Developed By</h2>
                <p className="text-gray-700 mb-6">
                    Vishwas Chourasiya, Arun Kumar Pandey, Satyam Pyasi<br />
                    MCA 3rd Semester – Shri Ram Institute of Technology
                </p>
                <div className="text-center">
                    <Link to="/" className="text-blue-600 hover:underline">Back to Home</Link>
                </div>
            </div>
        </div>
    );
};

export default About;
