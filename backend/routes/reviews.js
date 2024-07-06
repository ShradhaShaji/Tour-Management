// routes/reviews.js
import express from 'express';
import { createReview, getTourReviews, getAllReviews,deleteReview} from '../controllers/reviewController.js';

const router = express.Router();

router.post('/:tourId', createReview);
router.get('/:tourId', getTourReviews);
router.get('/', getAllReviews);
router.delete("/:reviewId", deleteReview);

export default router;
