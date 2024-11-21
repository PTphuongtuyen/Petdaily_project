const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/danhgia.controller');

// Định nghĩa các route
router.get('/', reviewController.getReviews);
router.post('/', reviewController.addReview);
router.get('/stats', reviewController.getStats);

module.exports = router;
