const Review = require("../models/review");

exports.createReviews = async (req, res) => {
    const { learner_id, tutor_id, rating, comment } = req.query;

    try {
        const reviews = new Review({
            learner_id,
            tutor_id,
            rating,
            comment
        });

        await reviews.save();
        res.status(201).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllReviews = async (req, res) => {
    const { learner_id, tutor_id } = req.query;
    const query = {};

    if (learner_id) query.learner_id = learner_id;
    if (tutor_id) query.tutor_id = tutor_id;

    try {
        const reviews = await Review.find(query).populate('learner_id tutor_id');
        res.json(reviews);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id).populate('learner_id tutor_id');

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.json(review);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};