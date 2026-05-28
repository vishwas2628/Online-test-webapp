import { useEffect, useState } from 'react';
import axios from '../config/axios';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiCheckCircle, FiXCircle, FiMinusCircle, FiBarChart2, FiBook, FiClock, FiTarget } from 'react-icons/fi';

const TestAnalytics = () => {
    const { testId } = useParams();
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const { data } = await axios.get(`/student/results/${testId}`);
                setResult(data);
            } catch (error) {
                console.error('Failed to fetch analytics', error);
            } finally {
                setLoading(false);
            }
        };
        fetchResult();
    }, [testId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (!result) return <div className="text-center py-20">Analytics not found.</div>;

    const { testId: test, answers, score, totalPoints } = result;

    if (!test || !test.questions) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center p-8 bg-white rounded-lg shadow-sm border border-red-100 max-w-md">
                    <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiXCircle className="text-3xl" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Details Unavailable</h3>
                    <p className="text-gray-500 mb-6">Unable to retrieve the complete test details for analytics. The original test may have been modified or removed.</p>
                    <Link to="/student/results" className="inline-flex items-center px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                        <FiArrowLeft className="mr-2" />
                        Back to Results
                    </Link>
                </div>
            </div>
        );
    }

    // Calculate detailed stats
    let correctCount = 0;
    let wrongCount = 0;
    let skippedCount = 0;

    const questionAnalysis = test.questions.map(q => {
        const userAnswer = answers.find(a => a.questionId === q._id)?.answer;
        let status = 'skipped';

        if (userAnswer) {
            if (userAnswer === q.correctAnswer) {
                status = 'correct';
                correctCount++;
            } else {
                status = 'wrong';
                wrongCount++;
            }
        } else {
            skippedCount++;
        }

        return { ...q, userAnswer, status };
    });

    const percentage = Math.round((score / totalPoints) * 100);

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link to="/student/results" className="inline-flex items-center text-gray-500 hover:text-primary-600 mb-4 transition">
                        <FiArrowLeft className="mr-2" />
                        Back to Results
                    </Link>
                    <h1 className="text-3xl font-heading font-bold text-gray-900">{test.title} - Analysis</h1>
                    <p className="text-gray-500 mt-2">Comprehensive review of your performance.</p>
                </div>

                {/* Score Summary Card */}
                <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden mb-10">
                    <div className="bg-primary-600 p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl"></div>
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                            <div>
                                <p className="text-primary-100 font-medium uppercase tracking-wider mb-1">Total Score</p>
                                <div className="text-5xl font-bold mb-2">{score} <span className="text-2xl opacity-70">/ {totalPoints}</span></div>
                                <div className="inline-flex items-center bg-primary-700/50 px-3 py-1 rounded-full text-sm">
                                    <FiTarget className="mr-2" />
                                    {percentage}% Accuracy
                                </div>
                            </div>

                            <div className="mt-6 md:mt-0 flex gap-6">
                                <div className="text-center">
                                    <div className="w-16 h-16 rounded-lg bg-white/20 flex items-center justify-center text-3xl font-bold mb-2">{correctCount}</div>
                                    <p className="text-sm text-primary-100">Correct</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 rounded-lg bg-white/20 flex items-center justify-center text-3xl font-bold mb-2">{wrongCount}</div>
                                    <p className="text-sm text-primary-100">Wrong</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 rounded-lg bg-white/20 flex items-center justify-center text-3xl font-bold mb-2">{skippedCount}</div>
                                    <p className="text-sm text-primary-100">Skipped</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                        <div className="p-6 text-center">
                            <p className="text-gray-400 text-xs font-bold uppercase mb-2">Subject</p>
                            <p className="text-lg font-bold text-gray-900">{test.subject}</p>
                        </div>
                        <div className="p-6 text-center">
                            <p className="text-gray-400 text-xs font-bold uppercase mb-2">Duration</p>
                            <p className="text-lg font-bold text-gray-900">{test.duration} mins</p>
                        </div>
                        <div className="p-6 text-center">
                            <p className="text-gray-400 text-xs font-bold uppercase mb-2">Date Attempted</p>
                            <p className="text-lg font-bold text-gray-900">{new Date(result.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>

                {/* Question Analysis */}
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <FiBarChart2 className="mr-3 text-secondary-500" />
                    Question Analysis
                </h2>

                <div className="space-y-6">
                    {questionAnalysis.map((q, index) => (
                        <div key={index} className={`bg-white rounded-lg p-6 border-l-4 shadow-sm transition-all hover:shadow-md ${q.status === 'correct' ? 'border-green-500' :
                            q.status === 'wrong' ? 'border-red-500' : 'border-gray-300'
                            }`}>
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center">
                                    <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600 mr-3">
                                        Q{index + 1}
                                    </span>
                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${q.status === 'correct' ? 'bg-green-100 text-green-700' :
                                        q.status === 'wrong' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        {q.status}
                                    </span>
                                </div>
                                <span className="text-sm font-semibold text-gray-400">{q.points} Marks</span>
                            </div>

                            <p className="text-lg font-medium text-gray-900 mb-6">{q.text}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className={`p-4 rounded-xl border ${q.status === 'correct' ? 'bg-green-50 border-green-200' :
                                    q.status === 'wrong' ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'
                                    }`}>
                                    <p className="text-xs font-bold uppercase mb-1 opacity-70">Your Answer</p>
                                    <div className="flex items-center font-bold">
                                        {q.status === 'correct' && <FiCheckCircle className="mr-2 text-green-600" />}
                                        {q.status === 'wrong' && <FiXCircle className="mr-2 text-red-600" />}
                                        {q.status === 'skipped' && <FiMinusCircle className="mr-2 text-gray-400" />}
                                        {q.userAnswer || 'Not Attempted'}
                                    </div>
                                    {q.status === 'wrong' && (
                                        <p className="text-xs text-red-600 mt-1 font-medium">- {(q.points || 1) * 0.25} points deducted</p>
                                    )}
                                </div>

                                <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">Correct Answer</p>
                                    <div className="flex items-center font-bold text-gray-900">
                                        <FiCheckCircle className="mr-2 text-green-500" />
                                        {q.correctAnswer}
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {q.options.join(', ')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TestAnalytics;
