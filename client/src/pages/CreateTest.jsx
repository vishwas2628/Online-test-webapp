import { useState } from 'react';
import axios from '../config/axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FiArrowLeft, FiPlus, FiTrash2, FiSave, FiClock, FiCalendar, FiBook, FiType, FiList } from 'react-icons/fi';

const CreateTest = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
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

    const removeQuestion = (index) => {
        if (questions.length > 1) {
            const newQuestions = questions.filter((_, i) => i !== index);
            setQuestions(newQuestions);
        } else {
            toast.error("A test must have at least one question.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic Validation
        if (!testData.title || !testData.subject || !testData.duration || !testData.startTime || !testData.endTime) {
            toast.error("Please fill in all test details.");
            return;
        }

        // Validate Questions
        for (let i = 0; i < questions.length; i++) {
            const q = questions[i];
            if (!q.text.trim()) {
                toast.error(`Question ${i + 1} is missing text.`);
                return;
            }
            if (q.options.some(opt => !opt.trim())) {
                toast.error(`Question ${i + 1} has empty options.`);
                return;
            }
            if (!q.correctAnswer) {
                toast.error(`Question ${i + 1} must have a correct answer selected.`);
                return;
            }
        }

        setLoading(true);
        try {
            // Format dates to ISO before sending to ensure timezone consistency
            const payload = {
                ...testData,
                startTime: new Date(testData.startTime).toISOString(),
                endTime: new Date(testData.endTime).toISOString(),
                questions
            };

            await axios.post('/teacher/tests', payload);
            toast.success('Test created successfully!');
            navigate('/teacher');
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to create test');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <Link to="/teacher" className="inline-flex items-center text-gray-500 hover:text-primary-600 mb-2 transition">
                            <FiArrowLeft className="mr-2" />
                            Back to Dashboard
                        </Link>
                        <h1 className="text-3xl font-heading font-bold text-gray-900">Create Assessment</h1>
                        <p className="text-gray-500">Design a new test for your students.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Section 1: Test Details */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sm:p-8">
                        <div className="flex items-center mb-6 text-primary-600">
                            <FiList className="w-5 h-5 mr-2" />
                            <h2 className="text-lg font-bold uppercase tracking-wide">Test Details</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Test Title</label>
                                <input
                                    name="title"
                                    value={testData.title}
                                    onChange={handleTestChange}
                                    placeholder="e.g. Mid-Term Physics Examination"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiBook className="text-gray-400" />
                                    </div>
                                    <input
                                        name="subject"
                                        value={testData.subject}
                                        onChange={handleTestChange}
                                        placeholder="e.g. Physics"
                                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Duration (Minutes)</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiClock className="text-gray-400" />
                                    </div>
                                    <input
                                        name="duration"
                                        type="number"
                                        min="1"
                                        value={testData.duration}
                                        onChange={handleTestChange}
                                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={testData.description}
                                    onChange={handleTestChange}
                                    placeholder="Instructions for students..."
                                    rows="3"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiCalendar className="text-gray-400" />
                                    </div>
                                    <input
                                        name="startTime"
                                        type="datetime-local"
                                        value={testData.startTime}
                                        onChange={handleTestChange}
                                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-gray-600"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiCalendar className="text-gray-400" />
                                    </div>
                                    <input
                                        name="endTime"
                                        type="datetime-local"
                                        value={testData.endTime}
                                        onChange={handleTestChange}
                                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-gray-600"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Questions */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center text-primary-600">
                                <FiType className="w-5 h-5 mr-2" />
                                <h2 className="text-lg font-bold uppercase tracking-wide">Questions</h2>
                            </div>
                            <span className="bg-primary-100 text-primary-700 text-xs font-bold px-3 py-1 rounded-full">{questions.length} Questions</span>
                        </div>

                        {questions.map((q, qIndex) => (
                            <div key={qIndex} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 relative group transition-all hover:shadow-md">
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        type="button"
                                        onClick={() => removeQuestion(qIndex)}
                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                                        title="Remove Question"
                                    >
                                        <FiTrash2 />
                                    </button>
                                </div>

                                <div className="mb-4 pr-10">
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Question {qIndex + 1}</label>
                                        <div className="flex items-center">
                                            <span className="text-xs text-gray-500 mr-2">Points:</span>
                                            <input
                                                type="number"
                                                min="1"
                                                value={q.points}
                                                onChange={(e) => handleQuestionChange(qIndex, 'points', e.target.value)}
                                                className="w-16 p-1 text-center text-sm border border-gray-200 rounded focus:ring-1 focus:ring-primary-500 transition"
                                            />
                                        </div>
                                    </div>
                                    <input
                                        value={q.text}
                                        onChange={(e) => handleQuestionChange(qIndex, 'text', e.target.value)}
                                        placeholder="Enter your question here..."
                                        className="w-full text-lg font-medium border-b border-gray-200 focus:border-primary-500 focus:outline-none py-2 transition-colors bg-transparent placeholder-gray-300"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    {q.options.map((opt, oIndex) => (
                                        <div key={oIndex} className="flex items-center">
                                            <span className="text-xs font-mono text-gray-400 mr-3 w-4">{String.fromCharCode(65 + oIndex)}.</span>
                                            <input
                                                value={opt}
                                                onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                                placeholder={`Option ${oIndex + 1}`}
                                                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all text-sm"
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <div className="flex items-center">
                                        <span className="text-sm font-semibold text-gray-700 mr-4">Correct Answer:</span>
                                        <select
                                            value={q.correctAnswer}
                                            onChange={(e) => handleQuestionChange(qIndex, 'correctAnswer', e.target.value)}
                                            className="flex-1 bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2 outline-none"
                                        >
                                            <option value="">Select the correct option</option>
                                            {q.options.map((opt, index) => (
                                                opt && <option key={index} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addQuestion}
                            className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 font-medium hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50 transition-all flex items-center justify-center gap-2"
                        >
                            <FiPlus className="w-5 h-5" />
                            Add Another Question
                        </button>
                    </div>

                    {/* Submit Action */}
                    <div className="sticky bottom-6 z-10">
                        <div className="bg-white/80 backdrop-blur-md border border-white/20 p-4 rounded-lg shadow-lg flex justify-end">
                            <button
                                type="button"
                                onClick={() => navigate('/teacher')}
                                className="px-6 py-3 text-gray-600 font-semibold hover:bg-gray-100 rounded-xl mr-4 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`flex items-center px-8 py-3 bg-primary-600 text-white rounded-xl font-bold shadow-lg shadow-primary-500/30 hover:bg-primary-700 transition-all transform hover:-translate-y-1 ${loading ? 'opacity-70 cursor-wait' : ''}`}
                            >
                                {loading ? 'Creating...' : (
                                    <>
                                        <FiSave className="mr-2" />
                                        Publish Test
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTest;
