import { useEffect, useState } from 'react';
import axios from '../config/axios';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiClock, FiAward, FiBarChart2, FiArrowLeft } from 'react-icons/fi';

const MyResults = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const { data } = await axios.get('/student/results');
                setResults(data);
            } catch {
                console.error('Failed to fetch results');
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, []);

    // Calculate generic stats
    const totalTests = results.length;
    const averageScore = totalTests > 0
        ? Math.round(results.reduce((acc, curr) => acc + (curr.score / curr.totalPoints) * 100, 0) / totalTests)
        : 0;

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link to="/student" className="inline-flex items-center text-gray-500 hover:text-primary-600 mb-4 transition">
                        <FiArrowLeft className="mr-2" />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-heading font-bold text-gray-900">Performance History</h1>
                    <p className="text-gray-500 mt-2">Track your progress and analyze your assessment results.</p>
                </div>

                {/* Stats Grid */}
                {totalTests > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl mr-4">
                                <FiCheckCircle className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Tests Completed</p>
                                <p className="text-2xl font-bold text-gray-900">{totalTests}</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center">
                            <div className="p-3 bg-secondary-50 text-secondary-600 rounded-xl mr-4">
                                <FiBarChart2 className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Average Score</p>
                                <p className="text-2xl font-bold text-gray-900">{averageScore}%</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center">
                            <div className="p-3 bg-rose-50 text-rose-600 rounded-xl mr-4">
                                <FiAward className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Top Rank</p>
                                <p className="text-2xl font-bold text-gray-900">Top 10%</p> {/* Static for now */}
                            </div>
                        </div>
                    </div>
                )}

                {/* Results List */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                    {results.length === 0 ? (
                        <div className="text-center py-20 px-6">
                            <div className="mx-auto h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-400">
                                <FiBarChart2 className="w-10 h-10" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">No results found</h3>
                            <p className="mt-1 text-gray-500">You haven't completed any tests yet.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-100">
                                <thead className="bg-gray-50/50">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Assessment</th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Score</th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                        <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-100">
                                    {results.map((result) => {
                                        const percentage = Math.round((result.score / result.totalPoints) * 100);
                                        const isPass = percentage >= 40; // Example logic

                                        return (
                                            <tr key={result._id} className="hover:bg-gray-50/80 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-gray-900">{result.testId?.title || 'Unknown Test'}</span>
                                                        <span className="text-xs text-gray-500">{result.testId?.subject || 'General'}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-3">
                                                            <div
                                                                className={`h-2 rounded-full ${percentage >= 75 ? 'bg-green-500' : percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                                                style={{ width: `${percentage}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="text-sm font-bold text-gray-900">{result.score}/{result.totalPoints}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <div className="flex items-center">
                                                        <FiClock className="mr-1.5 text-gray-400" />
                                                        {new Date(result.completedAt).toLocaleDateString()}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${isPass ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
                                                        }`}>
                                                        {isPass ? 'Passed' : 'Needs Work'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    {/* Access Control: Only show if test ended or manually completed */}
                                                    {(new Date() > new Date(result.testId?.endTime) || result.testId?.status === 'completed') ? (
                                                        <Link
                                                            to={`/student/analytics/${result.testId?._id}`}
                                                            className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition shadow-sm"
                                                        >
                                                            <FiBarChart2 className="mr-2" />
                                                            View Analysis
                                                        </Link>
                                                    ) : (
                                                        <span className="inline-flex items-center px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-400 cursor-not-allowed">
                                                            <FiClock className="mr-2" />
                                                            Available Later
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyResults;
