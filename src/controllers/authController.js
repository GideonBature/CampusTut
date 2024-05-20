const bcrypt = require("bcrypt");
const { User } = require("../models/index");
const { generateToken } = require("../utils/jwt");
const { setAsync, delAsync } = require("../config/redis");

exports.register = async (req, res) => {
    const { name, email, password, department, courseOfStudy, level, type } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, department, courseOfStudy, level, type });

        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = generateToken(user);
        await setAsync(user._id, token);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.logout = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = verifyToken(token);
        await delAsync(decoded.id);
        res.json({ message: 'User logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};