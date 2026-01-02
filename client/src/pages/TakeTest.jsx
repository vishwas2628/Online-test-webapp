import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../config/axios';
import { toast } from 'react-hot-toast';

const TakeTest = () => {
    const { testId } = useParams();
    const navigate = useNavigate();
    const [test, setTest] = useState(null);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(0);
    const timerRef = useRef();

    useEffect(() => {
        const fetchTest = async () => {
            try {
                const { data } = await axios.get(`/student/questions/${testId}`);
                setTest(data);
                // Set timer logic
                // If test has start/end time, logic is complex. 
                // For now, use duration * 60.
                setTimeLeft(data.duration * 60);
            } catch (error) {
                console.error('Failed to fetch test');
            }
        };
        fetchTest();
    }, [testId]);

    useEffect(() => {
        if (timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current);
                        submitTest();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timerRef.current);
    }, [timeLeft]);

    const handleAnswerChange = (questionId, option) => {
        setAnswers({ ...answers, [questionId]: option });
    };

    const submitTest = async () => {
        clearInterval(timerRef.current);
        const formattedAnswers = Object.keys(answers).map(qId => ({
            questionId: qId,
            answer: answers[qId]
        }));

        try {
            await axios.post(`/student/submit/${testId}`, {
                answers: formattedAnswers
            });
            toast.success('Test Submitted!');
            navigate('/student/results');
        } catch (error) {
            toast.error('Submission failed');
        }
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    if (!test) return <div>Loading Test...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <div>
                        <h1 className="text-2xl font-bold">{test.title}</h1>
                        <p className="text-gray-600">{test.subject}</p>
                    </div>
                    <div className="text-xl font-bold text-red-600 bg-red-100 px-4 py-2 rounded">
                        Time Left: {formatTime(timeLeft)}
                    </div>
                </div>

                <div className="space-y-6">
                    {test.questions.map((q, index) => (
                        <div key={q._id} className="p-4 border rounded bg-gray-50">
                            <p className="font-semibold text-lg mb-4">{index + 1}. {q.text} <span className="text-sm text-gray-500">({q.points} points)</span></p>
                            <div className="space-y-2">
                                {q.options.map((opt, i) => (
                                    <label key={i} className="flex items-center space-x-3 p-3 bg-white border rounded cursor-pointer hover:bg-blue-50">
                                        <input
                                            type="radio"
                                            name={q._id}
                                            value={opt}
                                            checked={answers[q._id] === opt}
                                            onChange={() => handleAnswerChange(q._id, opt)}
                                            className="h-4 w-4 text-blue-600"
                                        />
                                        <span>{opt}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex justify-end">
                    <button
                        onClick={submitTest}
                        className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-green-700"
                    >
                        Submit Test
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TakeTest;
