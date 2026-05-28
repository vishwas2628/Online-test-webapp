import { useEffect, useState } from 'react';
import axios from '../config/axios';
import { Link } from 'react-router-dom';
import { FiPlus, FiTrash2, FiBarChart2, FiClock, FiBook, FiCalendar, FiUsers } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const TeacherDashboard = () => {
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTests();
    }, []);

    const fetchTests = async () => {
        try {
            const { data } = await axios.get('/teacher/tests');
            setTests(data);
        } catch (error) {
            console.error('Failed to fetch tests', error);
            toast.error('Failed to load tests');
        } finally {
            setLoading(false);
        }
    };

    const deleteTest = async (id) => {
        if (window.confirm('Are you sure you want to delete this test? This action cannot be undone.')) {
            try {
                await axios.delete(`/teacher/tests/${id}`);
                toast.success('Test deleted successfully');
                fetchTests();
            } catch (error) {
                console.error('Failed to delete test', error);
                toast.error('Failed to delete test');
            }
        }
    };

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
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-heading font-bold text-gray-900">Teacher Dashboard</h1>
                        <p className="text-gray-500 mt-2">Manage assessments and track student performance.</p>
                    </div>

                    <Link
                        to="/teacher/create-test"
                        className="flex items-center px-6 py-3 bg-teal-600 text-white rounded-full font-bold shadow-lg shadow-teal-500/30 hover:bg-teal-500 transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <FiPlus className="mr-2" />
                        Create New Test
                    </Link>
                </div>

                {tests.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-lg border border-gray-100 shadow-sm">
                        <div className="mx-auto h-24 w-24 text-primary-200 bg-primary-50 rounded-full flex items-center justify-center mb-6">
                            <FiBook className="text-4xl" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">No tests created yet</h3>
                        <p className="mt-2 text-gray-500 max-w-sm mx-auto">Get started by creating your first comprehensive assessment below.</p>
                        <Link
                            to="/teacher/create-test"
                            className="mt-8 inline-flex items-center text-secondary-600 font-bold hover:text-secondary-700 hover:underline transition"
                        >
                            Create Your First Test &rarr;
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tests.map(test => (
                            <div key={test._id} className="group bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary-100 transition-all duration-300 flex flex-col overflow-hidden">
                                <div className="p-6 flex-1">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${test.status === 'active' ? 'bg-green-100 text-green-700' :
                                            test.status === 'upcoming' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {test.status ? test.status : 'Active'}
                                        </span>
                                        <button
                                            onClick={() => deleteTest(test._id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                                            title="Delete Test"
                                        >
                                            <FiTrash2 className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="text-xs font-bold text-primary-600 uppercase tracking-widest mb-1">{test.subject}</div>
                                    <h2 className="text-xl font-heading font-bold text-gray-900 mb-2 line-clamp-1" title={test.title}>{test.title}</h2>
                                    <p className="text-sm text-gray-500 mb-6 line-clamp-2">{test.description || 'No description provided.'}</p>

                                    <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
                                        <div className="flex items-center text-sm text-gray-700">
                                            <FiClock className="mr-3 text-primary-500" />
                                            <span><span className="font-semibold">Duration:</span> {test.duration} mins</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-700">
                                            <FiCalendar className="mr-3 text-secondary-500" />
                                            <span><span className="font-semibold">Date:</span> {new Date(test.startTime).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                                    <Link
                                        to={`/teacher/results/${test._id}`}
                                        className="flex items-center justify-center px-4 py-2.5 bg-white text-primary-700 border border-primary-100 rounded-lg font-bold hover:bg-primary-50 hover:border-primary-200 transition-all duration-300 shadow-sm"
                                    >
                                        <FiBarChart2 className="mr-2" />
                                        View Results & Analytics
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeacherDashboard;
