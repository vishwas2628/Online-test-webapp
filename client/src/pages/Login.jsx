import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            if (user.role === 'teacher') navigate('/teacher');
            else navigate('/student');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-canvas px-4 py-10">
            <div className="relative z-10 w-full max-w-md rounded-lg border border-stone-200 bg-white p-8 shadow-xl sm:p-10">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-heading font-black tracking-tight text-gray-950 mb-3">Welcome Back</h1>
                    <p className="text-gray-500">Sign in to continue your AstraQuiz workspace.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-primary-600">
                                <FiMail className="text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                            </div>
                            <input
                                type="email"
                                placeholder="name@example.com"
                                className="pl-11 block w-full px-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all duration-200 ease-out"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-semibold text-gray-700">Password</label>
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-primary-600">
                                <FiLock className="text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                            </div>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="pl-11 block w-full px-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all duration-200 ease-out"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-primary-600/20 text-sm font-bold text-white bg-ink hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed items-center gap-2"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <p className="text-sm text-gray-600">
                        New to AstraQuiz?{' '}
                        <Link to="/register" className="font-bold text-primary-600 hover:text-primary-700 transition hover:underline">
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
