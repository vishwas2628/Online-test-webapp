import { useEffect, useState } from 'react';
import axios from '../config/axios';
import { useParams, Link } from 'react-router-dom';

const TeacherTestResults = () => {
    const { testId } = useParams();
    const [results, setResults] = useState([]);
    const [test, setTest] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch test details for title (Using student endpoint logic or reuse teacher get?)
                // Actually teacher doesn't have a direct "get single test" in my new teacherController yet.
                // I should add it or use the student logic if accessible.
                // Or just use the teacher list and filter (inefficient).
                // Let's add getTestById to teacherController or assume generic access?
                // The backend refactor removed generic /tests/:id.
                // I will use /teacher/tests/:id which I need to implement or just /teacher/tests and find.
                // Ideally I should implement getTeacherTestById.
                // For now, let's assume I'll fix the backend to support GET /teacher/tests/:id.
                const testRes = await axios.get(`/teacher/tests/${testId}`);
                setTest(testRes.data);

                // Fetch results
                const res = await axios.get(`/result/test/${testId}`);
                setResults(res.data);
            } catch (error) {
                console.error('Failed to fetch data');
            }
        };
        fetchData();
    }, [testId]);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Results: {test?.title}</h1>
                    <p className="text-gray-600">Total Attempts: {results.length}</p>
                </div>
                <Link to="/teacher" className="text-blue-600 hover:underline">Back to Dashboard</Link>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {results.map((result) => (
                            <tr key={result._id}>
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                    {result.studentId?.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                    {result.studentId?.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">
                                    {result.score} / {result.totalPoints}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(result.completedAt).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                        {results.length === 0 && (
                            <tr>
                                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No attempts yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeacherTestResults;
