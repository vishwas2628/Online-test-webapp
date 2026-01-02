const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    type: { type: String, enum: ['mcq', 'numerical'], default: 'mcq' },
    options: [{ type: String }], // For MCQ
    correctAnswer: { type: String, required: true },
    points: { type: Number, default: 1 },
    tolerance: { type: Number },
    imageUrl: { type: String }
});

const testSchema = new mongoose.Schema({
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    subject: {
        type: String
    },
    duration: {
        type: Number, // in minutes
        required: true
    },
    startTime: {
        type: Date
    },
    endTime: {
        type: Date
    },
    status: {
        type: String,
        enum: ['upcoming', 'ongoing', 'completed'],
        default: 'upcoming'
    },
    questions: [questionSchema]
}, {
    timestamps: true
});

const Test = mongoose.model('Test', testSchema);
module.exports = Test;
