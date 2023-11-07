require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json()); // for parsing application/json

// MongoDB connection string
const mongoDBUri = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(mongoDBUri)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error(err));

// User model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    height: Number,
    weight: Number,
    gender: String,
    goal: String,
    age: Number,
    bmr: Number,
    caloricGoal: Number
});

const User = mongoose.model('User', userSchema);

// Registration route

app.post('/register', async (req, res) => {
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(409).send({ message: 'Username already taken' }); // 409 Conflict
        }

        // If user does not exist, proceed with registration
        const hashedPassword = await bcrypt.hash(req.body.password, 8);
        const user = new User({
            ...req.body,
            password: hashedPassword
        });
        await user.save();
    
        // Create a token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '24h'
        });
        res.status(201).send({ message: 'User registered successfully', user: user, token: token });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(400).send({ message: 'Error registering user', error: error.message });
    }
});



// Login route with token generation
app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user && await bcrypt.compare(req.body.password, user.password)) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '24h'
            });
            res.status(201).send({ message: 'Login successful', user, token });
        } else {
            res.status(400).send({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({ message: 'Error during login', error });
    }
});



// Get user data route

const authMiddleware = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');

        if (!token) {
            return res.status(401).send({ message: 'No token provided.' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).send({ message: 'Token expired.' });
                } else if (err.name === 'JsonWebTokenError') {
                    return res.status(401).send({ message: 'Invalid token.' });
                } else {
                    // Other types of errors
                    return res.status(401).send({ message: 'Failed to authenticate token.' });
                }
            }

            req.user = decoded;
            next();
        });
    } catch (error) {
        return res.status(401).send({ message: 'Failed to authenticate token.', error: error.message });
    }
};
// Get user data route using user ID from the token
app.get('/user/data', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            res.status(201).send(user);
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (error) {
        res.status(400).send({ message: 'Error fetching user data', error });
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));