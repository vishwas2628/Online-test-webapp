import { useEffect, useState } from 'react';
import axios from '../config/axios';
import { Link } from 'react-router-dom';
import { FiClock, FiBook, FiPlay, FiAlertCircle, FiAward, FiCalendar, FiCheckCircle } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const StudentDashboard = () => {
    const [tests, setTests] = useState([]);
    const [completedTestIds, setCompletedTestIds] = useState(new Set());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [testsRes, resultsRes] = await Promise.all([
                    axios.get('/student/tests'),
                    axios.get('/student/results')
                ]);

                setTests(testsRes.data);

                // Extract IDs of completed tests
                const ids = new Set(resultsRes.data.map(r => r.testId?._id).filter(id => id));
                setCompletedTestIds(ids);
            } catch (error) {
                console.error('Failed to fetch dashboard data', error);
                toast.error('Failed to load dashboard');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const isTestActive = (test) => {
        const now = new Date();
        const start = test.startTime ? new Date(test.startTime) : null;
        const end = test.endTime ? new Date(test.endTime) : null;

        if (start && now < start) return 'Upcoming';
        if (end && now > end) return 'Expired';
        return 'Active';
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
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-heading font-bold text-gray-900">Student Dashboard</h1>
                        <p className="text-gray-500 mt-2">View and attempt your scheduled examinations.</p>
                    </div>

                    <Link
                        to="/student/results"
                        className="flex items-center px-6 py-3 bg-white text-primary-600 border border-primary-200 rounded-full font-semibold shadow-sm hover:bg-primary-50 hover:text-primary-700 transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                        <FiAward className="mr-2" />
                        View Performance
                    </Link>
                </div>

                {/* Content */}
                {tests.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                        <div className="mx-auto h-24 w-24 text-primary-200 bg-primary-50 rounded-full flex items-center justify-center mb-6">
                            <FiBook className="text-4xl" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">No tests assigned yet</h3>
                        <p className="mt-2 text-gray-500 max-w-sm mx-auto">You're all caught up! Check back later for upcoming examinations.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tests.map(test => {
                            const status = isTestActive(test);
                            const isActive = status === 'Active';
                            const isCompleted = completedTestIds.has(test._id);

                            return (
                                <div key={test._id} className="group relative bg-white rounded-2xl shadow-sm border border-gray-100/80 hover:shadow-xl hover:border-primary-100 transition-all duration-300 flex flex-col h-full overflow-hidden">
                                    {/* Status Badge */}
                                    <div className="absolute top-4 right-4 max-w-fit z-10">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm
                                            ${isCompleted ? 'bg-green-100 text-green-700' :
                                                isActive ? 'bg-blue-100 text-blue-700' :
                                                    status === 'Upcoming' ? 'bg-orange-100 text-orange-700' :
                                                        'bg-red-100 text-red-700'}`
                                        }>
                                            {isCompleted ? 'Completed' : status}
                                        </span>
                                    </div>

                                    <div className="p-6 flex-1">
                                        <div className="text-xs font-bold text-primary-600 uppercase tracking-widest mb-2">{test.subject}</div>
                                        <h2 className="text-xl font-heading font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem]">{test.title}</h2>

                                        <p className="text-sm text-gray-500 leading-relaxed mb-6 line-clamp-3">
                                            {test.description || 'No additional description provided for this test.'}
                                        </p>

                                        <div className="grid grid-cols-2 gap-4 mb-2">
                                            <div className="bg-gray-50 p-3 rounded-xl">
                                                <div className="text-gray-400 text-xs font-semibold uppercase mb-1">Duration</div>
                                                <div className="flex items-center text-gray-900 font-medium">
                                                    <FiClock className="mr-1.5 text-primary-500" />
                                                    {test.duration} min
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 p-3 rounded-xl">
                                                <div className="text-gray-400 text-xs font-semibold uppercase mb-1">Questions</div>
                                                <div className="flex items-center text-gray-900 font-medium">
                                                    <FiBook className="mr-1.5 text-secondary-500" />
                                                    {test.questions?.length || 0} Qs
                                                </div>
                                            </div>
                                            <div className="col-span-2 bg-gray-50 p-3 rounded-xl flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <FiCalendar className="mr-2 text-gray-400" />
                                                    <div>
                                                        <div className="text-gray-400 text-xs font-semibold uppercase">Starts At</div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {new Date(test.startTime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 pt-0 mt-auto">
                                        {isCompleted ? (
                                            <button
                                                disabled
                                                className="flex items-center justify-center w-full px-4 py-3.5 bg-green-50 text-green-600 border border-green-200 rounded-xl font-bold cursor-not-allowed"
                                            >
                                                <FiCheckCircle className="mr-2" />
                                                Already Attempted
                                            </button>
                                        ) : isActive ? (
                                            <Link
                                                to={`/student/take-test/${test._id}`}
                                                className="flex items-center justify-center w-full px-4 py-3.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300 transform group-hover:-translate-y-1"
                                            >
                                                Start Examination
                                                <FiPlay className="ml-2" />
                                            </Link>
                                        ) : (
                                            <button
                                                disabled
                                                className="flex items-center justify-center w-full px-4 py-3.5 bg-gray-100 text-gray-400 rounded-xl font-bold cursor-not-allowed transition-colors"
                                            >
                                                <FiAlertCircle className="mr-2" />
                                                {status === 'Upcoming' ? 'Starts Soon' : 'Detailed Analysis'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;
