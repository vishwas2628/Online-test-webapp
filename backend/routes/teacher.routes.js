const express = require('express');
const router = express.Router();
const { createTest, getTeacherTests, deleteTest, getTeacherTestById } = require('../controllers/teacherController');
const { protect, teacher } = require('../middleware/authMiddleware');

router.route('/tests')
    .get(protect, teacher, getTeacherTests)
    .post(protect, teacher, createTest);

router.route('/tests/:id')
    .get(protect, teacher, getTeacherTestById)
    .delete(protect, teacher, deleteTest);

module.exports = router;
