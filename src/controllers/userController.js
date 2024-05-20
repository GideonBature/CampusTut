const User = require("../models/user");

exports.getAllUsers = async (req, res) => {
    const { type, department } = req.query;
    const query = { };

    if (type) query.type = type;
    if (department) query.department = department;

    try {
        const users = await User.find(query);
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}