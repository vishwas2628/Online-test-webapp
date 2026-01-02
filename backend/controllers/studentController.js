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
            totalPoints += question.points || 1;
            const submittedAnswer = answers.find(a => a.questionId === question._id.toString());

            if (submittedAnswer && submittedAnswer.answer === question.correctAnswer) {
                score += question.points || 1;
            }
        });

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
        // This typically assumes one attempt per test per student, or gets latest?
        // Or gets a specific attempt if ID passed? PDF says ":testId".
        const attempt = await TestAttempt.findOne({ testId: req.params.testId, studentId: req.user._id })
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
