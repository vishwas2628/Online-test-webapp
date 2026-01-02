const Test = require('../models/test.model');

// @desc    Create a new test
// @route   POST /api/tests
// @access  Private/Teacher
const createTest = async (req, res) => {
    try {
        const { title, description, subject, duration, startTime, endTime, questions } = req.body;

        const test = new Test({
            teacherId: req.user._id,
            title,
            description,
            subject,
            duration,
            startTime,
            endTime,
            questions
        });

        const createdTest = await test.save();
        res.status(201).json(createdTest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all tests (for students, filtered?) or teacher's tests
// @route   GET /api/tests
// @access  Private
const getTests = async (req, res) => {
    try {
        let query = {};
        if (req.user.role === 'teacher') {
            query = { teacherId: req.user._id };
        } else {
            // Students see all upcoming/ongoing tests? Or all?
            // For now, return all
            query = {};
        }

        const tests = await Test.find(query).populate('teacherId', 'name email');
        res.json(tests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single test by ID
// @route   GET /api/tests/:id
// @access  Private
const getTestById = async (req, res) => {
    try {
        const test = await Test.findById(req.params.id);

        if (test) {
            if (req.user.role === 'student') {
                const testObj = test.toObject();
                testObj.questions.forEach(q => delete q.correctAnswer);
                return res.json(testObj);
            }
            res.json(test);
        } else {
            res.status(404).json({ message: 'Test not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a test
// @route   DELETE /api/tests/:id
// @access  Private/Teacher
const deleteTest = async (req, res) => {
    try {
        const test = await Test.findById(req.params.id);

        if (test) {
            if (test.teacherId.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized to delete this test' });
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

module.exports = { createTest, getTests, getTestById, deleteTest };
