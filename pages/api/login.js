// pages/api/login.js

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User';
import dbConnect from '../../utils/dbConnect';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (user && await bcrypt.compare(req.body.password, user.password)) {
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                    expiresIn: '24h'
                });
                res.status(201).json({ message: 'Login successful', user, token });
            } else {
                res.status(400).json({ message: 'Invalid username or password' });
            }
        } catch (error) {
            console.error('Login Error:', error);
            res.status(400).json({ message: 'Error during login', error });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
