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

const puppeteer = require('puppeteer');
const Test = require('../models/test.model');

// @desc    Export test results to PDF
// @route   GET /api/result/export/:testId
const exportToPDF = async (req, res) => {
    try {
        const test = await Test.findById(req.params.testId);
        if (!test) return res.status(404).json({ message: 'Test not found' });

        const results = await TestAttempt.find({ testId: req.params.testId })
            .populate('studentId', 'name email')
            .sort('-score');

        // Calculate Analytics
        const totalStudents = results.length;
        const averageScore = totalStudents > 0
            ? (results.reduce((acc, curr) => acc + curr.score, 0) / totalStudents).toFixed(2)
            : 0;
        const highestScore = totalStudents > 0
            ? Math.max(...results.map(r => r.score))
            : 0;
        const passedCount = results.filter(r => (r.score / test.questions.reduce((a, b) => a + b.points, 0)) >= 0.4).length; // Assuming 40% pass
        const passPercentage = totalStudents > 0 ? ((passedCount / totalStudents) * 100).toFixed(1) : 0;

        const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: 'Helvetica', 'Arial', sans-serif; padding: 40px; color: #333; }
                .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #eee; padding-bottom: 20px; }
                .title { font-size: 28px; font-weight: bold; color: #2563eb; margin-bottom: 5px; }
                .subtitle { font-size: 16px; color: #666; margin-top: 5px; }
                .meta-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 30px; background: #f8fafc; padding: 20px; border-radius: 8px; }
                .meta-item { font-size: 14px; }
                .meta-label { font-weight: bold; color: #64748b; display: block; margin-bottom: 4px; }
                .meta-value { font-size: 18px; font-weight: 600; color: #1e293b; }
                
                table { width: 100%; border-collapse: collapse; margin-top: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
                th { background-color: #f1f5f9; color: #475569; font-weight: 600; text-align: left; padding: 12px 16px; border-bottom: 2px solid #e2e8f0; font-size: 14px; }
                td { padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #334155; }
                tr:last-child td { border-bottom: none; }
                tr:nth-child(even) { background-color: #f8fafc; }
                
                .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #eee; padding-top: 20px; }
                .status-pass { color: #16a34a; font-weight: bold; }
                .status-fail { color: #dc2626; font-weight: bold; }
                
                .logo { font-size: 24px; font-weight: 900; color: #2563eb; margin-bottom: 10px; }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="logo">ExamSphere</div>
                <div class="title">Test Result Report</div>
                <div class="subtitle">Comprehensive performance analytics for ${test.title}</div>
            </div>

            <div class="meta-grid">
                <div class="meta-item">
                    <span class="meta-label">Subject</span>
                    <span class="meta-value">${test.subject || 'N/A'}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Date Generated</span>
                    <span class="meta-value">${new Date().toLocaleDateString()}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Average Score</span>
                    <span class="meta-value">${averageScore}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Pass Percentage</span>
                    <span class="meta-value">${passPercentage}%</span>
                </div>
            </div>

            <h3>Student Performance</h3>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Student Name</th>
                        <th>Email</th>
                        <th>Score</th>
                        <th>Percentage</th>
                        <th>Submitted At</th>
                    </tr>
                </thead>
                <tbody>
                    ${results.map((result, index) => {
            const percentage = ((result.score / result.totalPoints) * 100).toFixed(1);
            return `
                        <tr>
                            <td>#${index + 1}</td>
                            <td>${result.studentId?.name || 'Unknown'}</td>
                            <td>${result.studentId?.email || 'N/A'}</td>
                            <td style="font-weight:bold">${result.score} / ${result.totalPoints}</td>
                            <td>${percentage}%</td>
                            <td>${new Date(result.completedAt).toLocaleString()}</td>
                        </tr>
                        `;
        }).join('')}
                </tbody>
            </table>

            <div class="footer">
                Generated internally by ExamSphere System on ${new Date().toLocaleString()}
            </div>
        </body>
        </html>
        `;

        const browser = await puppeteer.launch({
            headless: 'new',
            executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });

        await browser.close();

        const filename = `${test.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}-${test.subject?.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'report'}.pdf`;

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${filename}"`,
            'Content-Length': pdfBuffer.length
        });

        res.send(pdfBuffer);

    } catch (error) {
        console.error('PDF Export Error:', error);
        res.status(500).json({ message: 'Failed to generate PDF report' });
    }
};

module.exports = { getGroupResults, getStudentDetailResult, exportToPDF };
