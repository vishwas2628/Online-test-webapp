const express = require('express');
const router = express.Router();
const { createTest, getTests, getTestById, deleteTest } = require('../controllers/testController');
const { protect, teacher } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getTests)
    .post(protect, teacher, createTest);

router.route('/:id')
    .get(protect, getTestById)
    .delete(protect, teacher, deleteTest);

module.exports = router;
