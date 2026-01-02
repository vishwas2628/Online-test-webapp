import { useEffect, useState } from 'react';
import axios from '../config/axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const StudentDashboard = () => {
    const [tests, setTests] = useState([]);
    const { logout } = useAuth();

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const { data } = await axios.get('/student/tests');
                setTests(data);
            } catch (error) {
                console.error('Failed to fetch tests', error);
            }
        };
        fetchTests();
    }, []);

    const isTestActive = (test) => {
        // Logic to check if test is currently valid to take (within time range)
        // Simplification for now: always active as per my previous logic not checking strict dates in backend
        // Ideally: check start/end time.
        const now = new Date();
        const start = test.startTime ? new Date(test.startTime) : null;
        const end = test.endTime ? new Date(test.endTime) : null;

        if (start && now < start) return 'Upcoming';
        if (end && now > end) return 'Expired';
        return 'Active';
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Student Dashboard</h1>
                <div>
                    <Link to="/student/results" className="text-blue-600 mr-4 font-bold hover:underline">My Results</Link>
                    <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tests.map(test => {
                    const status = isTestActive(test);
                    return (
                        <div key={test._id} className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
                            <h2 className="text-xl font-bold mb-2">{test.title}</h2>
                            <p className="text-gray-600 mb-2">{test.subject}</p>
                            <p className="text-sm text-gray-500 mb-4">Duration: {test.duration} mins</p>
                            <div className="flex justify-between items-center mt-4">
                                <span className={`px-3 py-1 rounded text-sm font-semibold
                                    ${status === 'Active' ? 'bg-green-100 text-green-700' :
                                        status === 'Upcoming' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-red-100 text-red-700'}`
                                }>
                                    {status}
                                </span>
                                {status === 'Active' && (
                                    <Link to={`/student/take-test/${test._id}`} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                        Take Test
                                    </Link>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StudentDashboard;
