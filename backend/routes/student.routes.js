const express = require('express');
const router = express.Router();
const { getStudentTests, getTestQuestions, submitTestAttempt, getStudentTestResult, getStudentAllResults } = require('../controllers/studentController');
const { protect } = require('../middleware/authMiddleware');

router.get('/tests', protect, getStudentTests);
router.get('/questions/:testId', protect, getTestQuestions);
router.post('/submit/:testId', protect, submitTestAttempt);
router.get('/results', protect, getStudentAllResults);
router.get('/results/:testId', protect, getStudentTestResult);

module.exports = router;
