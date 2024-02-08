// models/User.js

import mongoose from 'mongoose';

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
}, {
    timestamps: true, // Add createdAt and updatedAt timestamps
});

// Prevent model overwrite upon initial save
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;