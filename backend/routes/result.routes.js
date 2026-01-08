const express = require('express');
const router = express.Router();
const { getGroupResults, getStudentDetailResult, exportToPDF } = require('../controllers/resultController');
const { protect, teacher } = require('../middleware/authMiddleware');

router.get('/test/:testId', protect, teacher, getGroupResults);
router.get('/test/:testId/student/:studentId', protect, teacher, getStudentDetailResult);
router.get('/export/:testId', protect, teacher, exportToPDF);

module.exports = router;
