import express from "express"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

const login = async (req, res) => {
    const { email, password } = req.body;
    try {

        const user = await User.findOne({ email }).populate('tenant', 'name');

        if (!user) {
            return res.status(404).json({ msg: "User not found" })
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id, tenant: user.tenant, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1d' }
        );


        res.status(200).json({
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                tenant: user.tenant,
            },
        });

        console.log('Login response:', {
            token,
            role: user.role,
            tenant: user.tenant
        });


    } catch (error) {
        res.status(500).json({ msg: "Login failed" })
        console.log(error);
    }
}

export default login;