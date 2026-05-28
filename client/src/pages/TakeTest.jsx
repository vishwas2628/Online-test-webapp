import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../config/axios';
import { toast } from 'react-hot-toast';
import { FiClock, FiCheckCircle, FiAlertTriangle, FiBook, FiCheckSquare } from 'react-icons/fi';

const TakeTest = () => {
    const { testId } = useParams();
    const navigate = useNavigate();
    const [test, setTest] = useState(null);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(0);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const timerRef = useRef();

    // Debug log to confirm new code is running
    console.log('TakeTest component initialized v2');

    const submitTest = useCallback(async (autoSubmit = false) => {
        if (!autoSubmit && !window.confirm('Are you sure you want to finish and submit your exam?')) {
            return;
        }

        clearInterval(timerRef.current);
        setSubmitting(true);

        const formattedAnswers = Object.keys(answers).map(qId => ({
            questionId: qId,
            answer: answers[qId]
        }));

        const toastId = toast.loading('Submitting your answers...');

        try {
            await axios.post(`/student/submit/${testId}`, {
                answers: formattedAnswers
            });
            toast.success('Examination Submitted Successfully!', { id: toastId });
            navigate('/student/results');
        } catch (error) {
            console.error(error);
            toast.error('Submission failed. Please try again.', { id: toastId });
            setSubmitting(false);
        }
    }, [answers, testId, navigate]);

    useEffect(() => {
        const fetchTest = async () => {
            try {
                const { data } = await axios.get(`/student/questions/${testId}`);
                setTest(data);
                // Simple duration logic for now
                setTimeLeft(data.duration * 60);
            } catch (error) {
                console.error('Failed to fetch test', error);
                toast.error('Failed to load examination.');
            } finally {
                setLoading(false);
            }
        };
        fetchTest();
    }, [testId]);

    useEffect(() => {
        if (timeLeft > 0 && !submitting) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current);
                        submitTest(true); // Auto-submit
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timerRef.current);
    }, [timeLeft, submitting, submitTest]);

    const handleAnswerChange = (questionId, option) => {
        setAnswers({ ...answers, [questionId]: option });
    };



    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;

        if (h > 0) {
            return `${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
        }
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const getTimerColor = () => {
        if (timeLeft < 60) return 'text-red-600 bg-red-50 border-red-200 animate-pulse';
        if (timeLeft < 300) return 'text-orange-600 bg-orange-50 border-orange-200';
        return 'text-primary-700 bg-primary-50 border-primary-200';
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (!test) return <div className="text-center py-20 text-red-500">Error loading test.</div>;

    const answeredCount = Object.keys(answers).length;
    const totalQuestions = test.questions.length;
    const progressPercentage = Math.round((answeredCount / totalQuestions) * 100);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sticky Timer Header */}
            <div className="sticky top-[64px] z-30 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 line-clamp-1">{test.title}</h2>
                        <div className="flex items-center text-xs text-gray-500 space-x-4">
                            <span>{test.subject}</span>
                            <span>•</span>
                            <span>{answeredCount} of {totalQuestions} Answered</span>
                        </div>
                    </div>

                    <div className={`flex items-center px-4 py-2 rounded-full border font-mono font-bold text-lg shadow-sm transition-colors ${getTimerColor()}`}>
                        <FiClock className="mr-2" />
                        {formatTime(timeLeft)}
                    </div>
                </div>
                {/* Progress Bar */}
                <div className="h-1 w-full bg-gray-100">
                    <div
                        className="h-full bg-primary-600 transition-all duration-500 ease-out"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="space-y-8">
                    {test.questions.map((q, index) => (
                        <div
                            key={q._id}
                            className={`bg-white rounded-2xl p-6 md:p-8 shadow-sm border transition-all duration-300 ${answers[q._id]
                                ? 'border-primary-200 shadow-md ring-1 ring-primary-50'
                                : 'border-gray-100'
                                }`}
                        >
                            <div className="flex items-start mb-6">
                                <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-500 font-bold text-sm mr-4 mt-0.5">
                                    {index + 1}
                                </span>
                                <div className="flex-1">
                                    <h3 className="text-lg font-medium text-gray-900 leading-relaxed">
                                        {q.text}
                                    </h3>
                                    <span className="inline-block mt-2 text-xs font-semibold text-gray-400 bg-gray-50 px-2 py-1 rounded">
                                        {q.points} Points
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3 pl-12">
                                {q.options.map((opt, i) => (
                                    <label
                                        key={i}
                                        className={`group relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${answers[q._id] === opt
                                            ? 'border-primary-500 bg-primary-50/30'
                                            : 'border-gray-100 hover:border-primary-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name={q._id}
                                            value={opt}
                                            checked={answers[q._id] === opt}
                                            onChange={() => handleAnswerChange(q._id, opt)}
                                            className="h-5 w-5 text-primary-600 border-gray-300 focus:ring-primary-500"
                                        />
                                        <span className={`ml-3 block text-sm font-medium ${answers[q._id] === opt ? 'text-primary-900' : 'text-gray-700'
                                            }`}>
                                            {opt}
                                        </span>
                                        {answers[q._id] === opt && (
                                            <FiCheckCircle className="absolute right-4 text-primary-500 w-5 h-5" />
                                        )}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex items-center justify-between bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky bottom-6 z-20">
                    <div className="flex items-center space-x-2 text-gray-600">
                        <FiAlertTriangle className="text-orange-500" />
                        <span className="text-sm">Please review before submitting.</span>
                    </div>
                    <button
                        onClick={() => submitTest()}
                        disabled={submitting}
                        className="flex items-center px-8 py-3.5 bg-green-600 text-white rounded-xl font-bold shadow-lg shadow-green-500/30 hover:bg-green-700 transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {submitting ? 'Submitting...' : (
                            <>
                                <FiCheckSquare className="mr-2" />
                                Final Submit
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TakeTest;
