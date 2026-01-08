import { useEffect, useState } from 'react';
import axios from '../config/axios';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiUsers, FiBarChart2, FiDownload, FiSearch } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const TeacherTestResults = () => {
    const { testId } = useParams();
    const [results, setResults] = useState([]);
    const [test, setTest] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch test details for title details
                const testRes = await axios.get(`/teacher/tests/${testId}`);
                setTest(testRes.data);

                // Fetch results
                const res = await axios.get(`/result/test/${testId}`);
                setResults(res.data);
            } catch (error) {
                console.error('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [testId]);

    // Calculate Stats
    const totalAttempts = results.length;
    const averageScore = totalAttempts > 0
        ? Math.round(results.reduce((acc, curr) => acc + (curr.score / curr.totalPoints) * 100, 0) / totalAttempts)
        : 0;

    // Calculate Pass Rate (assuming 40% is pass)
    const passCount = results.filter(r => (r.score / r.totalPoints) >= 0.4).length;
    const passRate = totalAttempts > 0 ? Math.round((passCount / totalAttempts) * 100) : 0;

    const handleExport = async () => {
        try {
            const toastId = toast.loading('Generating PDF report...');
            const response = await axios.get(`/result/export/${testId}`, {
                responseType: 'blob', // Important
            });

            // Create blob link to download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;

            // Extract filename from header or assume default
            const contentDisposition = response.headers['content-disposition'];
            let fileName = 'report.pdf';
            if (contentDisposition) {
                const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
                if (fileNameMatch.length === 2)
                    fileName = fileNameMatch[1];
            }

            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();

            toast.success('Report downloaded successfully!', { id: toastId });
        } catch (error) {
            console.error('Download failed', error);
            toast.error('Failed to download report');
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
                {/* Header */}
                <div className="mb-8">
                    <Link to="/teacher" className="inline-flex items-center text-gray-500 hover:text-primary-600 mb-4 transition">
                        <FiArrowLeft className="mr-2" />
                        Back to Dashboard
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-heading font-bold text-gray-900">{test?.title || 'Test Results'}</h1>
                            <p className="text-gray-500 mt-1">Detailed performance analytics and student submissions.</p>
                        </div>
                        {/* Only show Export if test is finished or explicitly completed */}
                        {(test && (new Date() > new Date(test.endTime) || test.status === 'completed')) && (
                            <button
                                onClick={handleExport}
                                className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition shadow-sm"
                            >
                                <FiDownload className="mr-2" />
                                Export Data
                            </button>
                        )}
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl mr-4">
                            <FiUsers className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Total Attempts</p>
                            <p className="text-2xl font-bold text-gray-900">{totalAttempts}</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
                        <div className="p-3 bg-green-50 text-green-600 rounded-xl mr-4">
                            <FiBarChart2 className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Average Score</p>
                            <p className="text-2xl font-bold text-gray-900">{averageScore}%</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-xl mr-4">
                            <FiBarChart2 className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Pass Rate</p>
                            <p className="text-2xl font-bold text-gray-900">{passRate}%</p>
                        </div>
                    </div>
                </div>

                {/* Results Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <h2 className="font-bold text-gray-700">Student Submissions</h2>
                        <div className="relative">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search student..."
                                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Student Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email Address</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Score Achieved</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Submission Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {results.map((result) => (
                                    <tr key={result._id} className="hover:bg-gray-50/80 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-8 w-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-xs mr-3">
                                                    {result.studentId?.name?.charAt(0) || 'S'}
                                                </div>
                                                <div className="text-sm font-medium text-gray-900">{result.studentId?.name}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {result.studentId?.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-gray-900">{result.score} <span className="text-gray-400 font-normal">/ {result.totalPoints}</span></div>
                                            <div className="w-24 bg-gray-100 rounded-full h-1.5 mt-1">
                                                <div
                                                    className="bg-primary-500 h-1.5 rounded-full"
                                                    style={{ width: `${(result.score / result.totalPoints) * 100}%` }}
                                                ></div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(result.completedAt).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2.5 py-0.5 inline-flex text-xs font-medium rounded-full bg-green-100 text-green-800">
                                                Graded
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {results.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                            No students have attempted this test yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherTestResults;
