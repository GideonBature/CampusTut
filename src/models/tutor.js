const mongoose = require("mongoose");

const tutorSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    availability: {
        type: [String],
        required: true
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    }]
});

const Tutor = mongoose.model("Tutor", tutorSchema);
module.exports = Tutor;