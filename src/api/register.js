// pages/api/register.js

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User';
import dbConnect from '../../utils/dbConnect';

export default async function handler(req, res) {
    await dbConnect();
    console.log("Here")
    if (req.method === 'POST') {
        try {
            const existingUser = await User.findOne({ username: req.body.username });
            if (existingUser) {
                return res.status(409).json({ message: 'Username already taken' });
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 8);
            const user = new User({
                ...req.body,
                password: hashedPassword
            });
            await user.save();

            console.log("here2 before token")
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '24h'
            
            });
            res.status(201).json({ message: 'User registered successfully', user, token });
        } catch (error) {
            console.error('Registration Error:', error);
            res.status(400).json({ message: 'Error registering user', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}