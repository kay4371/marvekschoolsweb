// app.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev')); // Logging
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Serve static files from the 'public' directory (if you have CSS/JS/images)
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
// Serve your HTML file
// app.get('/', (req, res) => {
//     // Read the HTML file (assuming it's named index.html in the same directory)
//     fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, data) => {
//         if (err) {
//             console.error('Error reading HTML file:', err);
//             return res.status(500).send('Error loading the website');
//         }
//         res.send(data);
//     });
// });

// Payment processing endpoint
app.post('/api/payments', (req, res) => {
    const { studentName, studentId, paymentType, amount, paymentMethod } = req.body;
    
    // Validate required fields
    if (!studentName || !studentId || !paymentType || !amount || !paymentMethod) {
        return res.status(400).json({ 
            success: false, 
            message: 'All fields are required' 
        });
    }

    // Simulate payment processing
    setTimeout(() => {
        // Simulate random success/failure
        const isSuccess = Math.random() > 0.1; // 90% success rate
        
        if (isSuccess) {
            res.json({
                success: true,
                message: 'Payment initiated successfully',
                transactionId: 'TXN' + Date.now(),
                data: {
                    studentName,
                    studentId,
                    paymentType,
                    amount,
                    paymentMethod,
                    timestamp: new Date().toISOString()
                }
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Payment processing failed. Please try again or contact support.'
            });
        }
    }, 2000); // Simulate 2 second processing time
});

// Contact form endpoint
app.post('/api/contact', (req, res) => {
    const { parentName, email, phone, subject, message } = req.body;
    
    // Validate required fields
    if (!parentName || !email || !phone || !subject || !message) {
        return res.status(400).json({ 
            success: false, 
            message: 'All fields are required' 
        });
    }

    // Simulate message processing
    setTimeout(() => {
        // Simulate random success/failure
        const isSuccess = Math.random() > 0.05; // 95% success rate
        
        if (isSuccess) {
            // In a real app, you would save this to a database
            console.log('New contact message:', { parentName, email, phone, subject, message });
            
            res.json({
                success: true,
                message: 'Thank you for your message! We will get back to you within 24 hours.',
                messageId: 'MSG' + Date.now(),
                data: {
                    parentName,
                    email,
                    phone,
                    subject,
                    timestamp: new Date().toISOString()
                }
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to send message. Please try again or call us directly.'
            });
        }
    }, 1500); // Simulate 1.5 second processing time
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Press CTRL+C to stop the server`);
});