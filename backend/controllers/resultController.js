const TestAttempt = require('../models/testAttempt.model');

// @desc    Teacher view of all student results for a test
// @route   GET /api/result/test/:testId
const getGroupResults = async (req, res) => {
    try {
        const results = await TestAttempt.find({ testId: req.params.testId })
            .populate('studentId', 'name email')
            .sort('-score');
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    View detailed result for a single student
// @route   GET /api/result/test/:testId/student/:studentId
const getStudentDetailResult = async (req, res) => {
    try {
        const result = await TestAttempt.findOne({
            testId: req.params.testId,
            studentId: req.params.studentId
        }).populate('studentId', 'name email');

        if (!result) return res.status(404).json({ message: 'Result not found' });
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getGroupResults, getStudentDetailResult };
