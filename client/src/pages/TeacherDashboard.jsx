import { useEffect, useState } from 'react';
import axios from '../config/axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TeacherDashboard = () => {
    const [tests, setTests] = useState([]);
    const { logout } = useAuth();

    useEffect(() => {
        fetchTests();
    }, []);

    const fetchTests = async () => {
        try {
            const { data } = await axios.get('/teacher/tests');
            setTests(data);
        } catch (error) {
            console.error('Failed to fetch tests', error);
        }
    };

    const deleteTest = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await axios.delete(`/teacher/tests/${id}`);
                fetchTests();
            } catch (error) {
                console.error('Failed to delete test', error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
                <div>
                    <Link to="/teacher/create-test" className="bg-blue-600 text-white px-4 py-2 rounded mr-4">Create Test</Link>
                    <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tests.map(test => (
                    <div key={test._id} className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-2">{test.title}</h2>
                        <p className="text-gray-600 mb-2">{test.subject}</p>
                        <p className="text-sm text-gray-500 mb-4">Duration: {test.duration} mins</p>
                        <div className="flex justify-between items-center">
                            <span className={`px-2 py-1 rounded text-xs ${test.status === 'upcoming' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
                                {test.status}
                            </span>
                            <div>
                                <Link to={`/teacher/results/${test._id}`} className="text-blue-600 mr-4 hover:underline">Results</Link>
                                <button onClick={() => deleteTest(test._id)} className="text-red-600 hover:underline">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeacherDashboard;
