const express = require('express');
const tutorController = require('../controllers/tutorController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/tutors', authMiddleware, tutorController.getAllTutors);
router.get('/tutors/:id', authMiddleware, tutorController.getTutorById);
router.put('/tutors/:id', authMiddleware, tutorController.updateTutor);

module.exports = router;