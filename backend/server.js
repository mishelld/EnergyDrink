const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');  // Import CORS

dotenv.config();

const app = express();
require('dotenv').config();

// **Enable CORS Middleware**
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from your frontend
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization'
}));

// Middleware to parse JSON
app.use(express.json());  

const mongoURI = `mongodb+srv://mish:mish@energy-drink.vx7dt.mongodb.net/?retryWrites=true&w=majority&appName=energy-drink`;

// MongoDB Connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err));

// User Model
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

// Register Route (Sign Up)
app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user and save to DB
        const newUser = new User({
            email,
            password: hashedPassword
        });
        await newUser.save();

        // Respond with success message
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error during registration:', err);  // Log error
        res.status(500).json({ message: 'Server error' });
    }
});

// Login Route (Sign In)
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        // Respond with token
        res.status(200).json({ token });
    } catch (err) {
        console.error('Error during login:', err);  // Fixed error message
        res.status(500).json({ message: 'Server error' });
    }
});

// Protected Route Example (Dashboard)
app.get('/api/dashboard', async (req, res) => {
    const token = req.header('Authorization')?.split(' ')[1];  // Get the token from header

    if (!token) {
        return res.status(401).json({ message: 'Authorization token required' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Welcome to the dashboard', user });
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
