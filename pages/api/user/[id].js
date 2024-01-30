import dbConnect from '../../../utils/dbConnect'; // Adjust the path as needed
import User from '../../../models/User'; // Adjust the path as needed

export default async function handler(req, res) {
    const {
        query: { id },
        method
    } = req;

    await dbConnect();

    if (method === 'PUT') {
        try {
            const user = await User.findByIdAndUpdate(id, req.body, {
                new: true,
                runValidators: true
            });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}
