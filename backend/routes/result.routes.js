const express = require('express');
const router = express.Router();
const { getGroupResults, getStudentDetailResult } = require('../controllers/resultController');
const { protect, teacher } = require('../middleware/authMiddleware');

router.get('/test/:testId', protect, teacher, getGroupResults);
router.get('/test/:testId/student/:studentId', protect, teacher, getStudentDetailResult);

module.exports = router;
