const Tutor = require("../models/tutor");

exports.getAllTutors = async (req, res) => {
    const { department, course } = req.query;
    const query = {};

    if (department) query.department = department;
    if (course) query.courses = course;

    try {
        const tutors = await Tutor.find();
        res.json(tutors);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTutorById = async (req, res) => {
    try {
        const tutor = await Tutor.findById(req.params.id).populate('user_id courses');
        if (!tutor) {
            return res.status(404).json({ message: "Tutor not found" });
        }
        res.json(tutor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTutor = async (req, res) => {
    try {
        const tutor = await Tutor.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!tutor) {
            return res.status(404).json({ message: "Tutor not found" });
        }

        res.json(tutor);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};