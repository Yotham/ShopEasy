// pages/api/user/[id].js

import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';

export default async function handler(req, res) {
    const {
        query: { id },
        method,
    } = req;
    await dbConnect();

    if (method === 'PUT') {
        try {
            console.log(req.body)
            const heightInches = (req.body.height[0] *12) + req.body.height[1]
            const heightInCm = heightInches*2.54
            const weightInKg = req.body.weight * 0.453592;

            let bmr;
            if (req.body.gender === "Male") {
                bmr = 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * req.body.age);
            } else if (req.body.gender === "Female") {
                bmr = 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * req.body.age);
            } else {  // For "Other" gender
                const bmrMale = 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * req.body.age);
                const bmrFemale = 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * req.body.age);
                bmr = (bmrMale + bmrFemale) / 2;
            }
        
            // Caloric Goal Calculation
            let caloricGoal;
            if (req.body.goal === "Lose Weight") {
                caloricGoal = bmr - 500; // Subtract 500 calories for weight loss
            } else if (req.body.goal === "Gain Weight") {
                caloricGoal = bmr + 500; // Add 500 calories for weight gain
            } else {
                caloricGoal = bmr; // Maintain current weight
            }
            const user = await User.findByIdAndUpdate(id, { $set: { goal: req.body.goal, weight: req.body.weight, gender: req.body.gender,height:heightInCm, bmr: bmr, caloricGoal: caloricGoal, age:req.body.age} }, { new: true });
            if (!user) {
                return res.status(404).json({ success: false });
            }
            console.log("user",user)
            console.log(user)
            res.status(200).json({ success: true, data: user });
        } catch (error) {
            console.log("here",req.body)
            res.status(400).json({ success: false });
        }
    } else {
        res.status(405).json({ success: false, error: 'Method not allowed' });
    }
}
