import { useState } from 'react';
import axios from '../config/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const CreateTest = () => {
    const navigate = useNavigate();
    const [testData, setTestData] = useState({
        title: '',
        description: '',
        subject: '',
        duration: 30,
        startTime: '',
        endTime: '',
    });
    const [questions, setQuestions] = useState([
        { text: '', options: ['', '', '', ''], correctAnswer: '', points: 1 }
    ]);

    const handleTestChange = (e) => {
        setTestData({ ...testData, [e.target.name]: e.target.value });
    };

    const handleQuestionChange = (index, field, value) => {
        const newQuestions = [...questions];
        newQuestions[index][field] = value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (qIndex, oIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[oIndex] = value;
        setQuestions(newQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { text: '', options: ['', '', '', ''], correctAnswer: '', points: 1 }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/teacher/tests', { ...testData, questions });
            toast.success('Test created successfully');
            navigate('/teacher');
        } catch (error) {
            toast.error('Failed to create test');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-3xl font-bold mb-6">Create New Test</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <input name="title" placeholder="Test Title" onChange={handleTestChange} className="border p-2 rounded" required />
                    <input name="subject" placeholder="Subject" onChange={handleTestChange} className="border p-2 rounded" required />
                    <input name="description" placeholder="Description" onChange={handleTestChange} className="border p-2 rounded" />
                    <input name="duration" type="number" placeholder="Duration (mins)" onChange={handleTestChange} className="border p-2 rounded" required />
                    <input name="startTime" type="datetime-local" onChange={handleTestChange} className="border p-2 rounded" />
                    <input name="endTime" type="datetime-local" onChange={handleTestChange} className="border p-2 rounded" />
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-bold mb-4">Questions</h2>
                    {questions.map((q, qIndex) => (
                        <div key={qIndex} className="bg-gray-50 p-4 rounded mb-4 border">
                            <div className="flex justify-between mb-2">
                                <span className="font-bold">Question {qIndex + 1}</span>
                                <input
                                    type="number"
                                    placeholder="Points"
                                    value={q.points}
                                    onChange={(e) => handleQuestionChange(qIndex, 'points', e.target.value)}
                                    className="border p-1 w-20 rounded"
                                />
                            </div>
                            <input
                                placeholder="Question Text"
                                value={q.text}
                                onChange={(e) => handleQuestionChange(qIndex, 'text', e.target.value)}
                                className="border p-2 w-full rounded mb-2"
                                required
                            />
                            <div className="grid grid-cols-2 gap-2 mb-2">
                                {q.options.map((opt, oIndex) => (
                                    <input
                                        key={oIndex}
                                        placeholder={`Option ${oIndex + 1}`}
                                        value={opt}
                                        onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                        className="border p-2 rounded"
                                        required
                                    />
                                ))}
                            </div>
                            <select
                                value={q.correctAnswer}
                                onChange={(e) => handleQuestionChange(qIndex, 'correctAnswer', e.target.value)}
                                className="border p-2 w-full rounded"
                                required
                            >
                                <option value="">Select Correct Answer</option>
                                {q.options.map((opt, index) => (
                                    opt && <option key={index} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                    <button type="button" onClick={addQuestion} className="bg-green-500 text-white px-4 py-2 rounded">+ Add Question</button>
                </div>

                <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded text-lg font-bold">Create Test</button>
            </form>
        </div>
    );
};

export default CreateTest;
