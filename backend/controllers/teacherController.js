const Test = require('../models/test.model');

// @desc    Create a new test
// @route   POST /api/teacher/tests
// @access  Private/Teacher
const createTest = async (req, res) => {
    try {
        const { title, description, subject, duration, startTime, endTime, questions } = req.body;
        const test = await Test.create({
            teacherId: req.user._id,
            title, description, subject, duration, startTime, endTime, questions
        });
        res.status(201).json(test);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get tests created by teacher
// @route   GET /api/teacher/tests
// @access  Private/Teacher
const getTeacherTests = async (req, res) => {
    try {
        const tests = await Test.find({ teacherId: req.user._id });
        res.json(tests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a test
const deleteTest = async (req, res) => {
    try {
        const test = await Test.findById(req.params.id);
        if (test) {
            if (test.teacherId.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }
            await test.deleteOne();
            res.json({ message: 'Test removed' });
        } else {
            res.status(404).json({ message: 'Test not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single teacher test
const getTeacherTestById = async (req, res) => {
    try {
        const test = await Test.findById(req.params.id);
        if (test) {
            // Verify ownership?
            if (test.teacherId.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }
            res.json(test);
        } else {
            res.status(404).json({ message: 'Test not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createTest, getTeacherTests, deleteTest, getTeacherTestById };
