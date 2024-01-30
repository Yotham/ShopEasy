// pages/api/user/data.js

import jwt from 'jsonwebtoken';
import User from '../../../models/User';
import dbConnect from '../../../utils/dbConnect';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'GET') {
        try {
            const token = req.headers.authorization.replace('Bearer ', ''); // Get the JWT token from the request header
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decodedToken._id);

            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            res.status(400).json({ message: 'Error fetching user data', error });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
