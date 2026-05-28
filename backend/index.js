const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'https://frontend-qqtw.onrender.com', 'http://localhost:5000'],
    credentials: true,
    exposedHeaders: ['Content-Disposition']
}));
app.use(cookieParser());

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/online-test-app')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log("mongo is connection err", err));

// Routes
app.use('/api/user', require('./routes/user.routes'));
app.use('/api/teacher', require('./routes/teacher.routes'));
app.use('/api/student', require('./routes/student.routes'));
app.use('/api/result', require('./routes/result.routes'));

app.get('/api/health', (req, res) => {
    res.status(200).send('OK');
});

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
