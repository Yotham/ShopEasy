require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json()); // for parsing application/json

// MongoDB connection string
const mongoDBUri = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(mongoDBUri, { useNewUrlParser: true, useUnifiedTopology: true })
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
        const user = new User(req.body);
        await user.save();
        res.status(201).send({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(400).send({ message: 'Error registering user', error });
    }
});

// Login route
app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username, password: req.body.password });
        if (user) {
            res.send({ message: 'Login successful', user });
        } else {
            res.status(400).send({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(400).send({ message: 'Error during login', error });
    }
});

// Get user data route
app.get('/user/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (user) {
            res.send(user);
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (error) {
        res.status(400).send({ message: 'Error fetching user data', error });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
