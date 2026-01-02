const Test = require('../models/test.model');
const TestAttempt = require('../models/testAttempt.model');

// @desc    Get available tests for student
// @route   GET /api/student/tests
// @access  Private/Student
const getStudentTests = async (req, res) => {
    try {
        const tests = await Test.find({ status: { $ne: 'completed' } }).select('-questions.correctAnswer');
        // Simple logic: fetch all non-completed tests? 
        // PDF says "Fetch available and upcoming tests"
        res.json(tests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get questions for specific test
// @route   GET /api/student/questions/:testId
// @access  Private/Student
const getTestQuestions = async (req, res) => {
    try {
        const test = await Test.findById(req.params.testId);
        if (!test) return res.status(404).json({ message: 'Test not found' });

        const testObj = test.toObject();
        testObj.questions.forEach(q => delete q.correctAnswer);
        res.json(testObj);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Submit test attempt
// @route   POST /api/student/submit/:testId
// @access  Private/Student
const submitTestAttempt = async (req, res) => {
    try {
        const { testId } = req.params;
        const { answers } = req.body;
        const studentId = req.user._id;

        const test = await Test.findById(testId);
        if (!test) return res.status(404).json({ message: 'Test not found' });

        let score = 0;
        let totalPoints = 0;

        test.questions.forEach(question => {
            const points = question.points || 1;
            totalPoints += points;

            const submittedAnswer = answers.find(a => a.questionId === question._id.toString());

            if (submittedAnswer && submittedAnswer.answer) {
                if (submittedAnswer.answer === question.correctAnswer) {
                    score += points;
                } else {
                    // Negative marking: Deduct 25% of the question's points for wrong answers
                    score -= (points * 0.25);
                }
            }
        });

        // Optional: Ensure score isn't negative overall? 
        // Real exams allow negative total, but typically we display 0 if < 0 for basic apps.
        // Let's keep it real (allow negative) or floor at 0? 
        // I'll floor at 0 to be safe for UI display unless requested otherwise.
        if (score < 0) score = 0;

        const attempt = await TestAttempt.create({
            studentId,
            testId,
            answers,
            score,
            totalPoints
        });

        res.status(201).json(attempt);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    View result of completed test
// @route   GET /api/student/results/:testId
const getStudentTestResult = async (req, res) => {
    try {
        const attempt = await TestAttempt.findOne({ testId: req.params.testId, studentId: req.user._id })
            .populate('testId') // Populate full test details including correct answers for analytics
            .sort('-createdAt');

        if (!attempt) return res.status(404).json({ message: 'Result not found' });
        res.json(attempt);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getStudentAllResults = async (req, res) => {
    try {
        const results = await TestAttempt.find({ studentId: req.user._id })
            .populate('testId', 'title subject')
            .sort('-createdAt');
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getStudentTests, getTestQuestions, submitTestAttempt, getStudentTestResult, getStudentAllResults };
