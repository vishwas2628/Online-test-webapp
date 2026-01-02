import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
            <h1 className="text-5xl font-bold mb-6">Online Test Platform</h1>
            <p className="text-xl mb-8 text-center max-w-2xl">
                A secure and efficient way to manage and take tests online.
                Perfect for schools and educational institutions.
            </p>
            <div className="space-x-4">
                <Link to="/login" className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition shadow-lg">Login</Link>
                <Link to="/register" className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-600 transition shadow-lg">Register</Link>
            </div>
            <Link to="/about" className="mt-12 underline opacity-80 hover:opacity-100">About Us</Link>
        </div>
    );
};

export default Landing;
