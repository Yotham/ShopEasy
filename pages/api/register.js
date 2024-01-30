import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User';
import dbConnect from '../../utils/dbConnect';

export default async function handler(req, res) {
    await dbConnect();

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

            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '24h'
            });

            // Set token in HTTP-only cookie
            res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=86400`); // 86400 seconds = 24 hours

            res.status(201).json({ message: 'User registered successfully', user });
        } catch (error) {
            console.error('Registration Error:', error);
            res.status(400).json({ message: 'Error registering user', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
