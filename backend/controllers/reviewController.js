// controllers/reviewController.js
import Review from "../models/Review.js";
import Tour from "../models/Tour.js";

export const createReview = async (req, res) => {
    const tourId = req.params.tourId;
    const newReview = new Review({ ...req.body, productId: tourId });
    try {
        const savedReview = await newReview.save();
        await Tour.findByIdAndUpdate(tourId, { $push: { reviews: savedReview._id } });
        res.status(200).json({ success: true, message: "Review submitted", data: savedReview });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to submit review", error: err.message });
    }
};

export const getTourReviews = async (req, res) => {
    const tourId = req.params.tourId;
    try {
        const tour = await Tour.findById(tourId).populate('reviews');
        if (!tour) {
            return res.status(404).json({ success: false, message: 'Tour not found' });
        }
        res.status(200).json({ success: true, reviews: tour.reviews });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch reviews', error: err.message });
    }
};

export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate('productId'); // Assuming 'productId' references the Tour
        res.status(200).json({ success: true, reviews });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch reviews', error: err.message });
    }
};

export const deleteReview = async (req, res) => {
    const reviewId = req.params.reviewId;
    try {
        // Implement logic to delete the review from the database
        await Review.findByIdAndDelete(reviewId);
        res.status(200).json({ success: true, message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete review", error: error.message });
    }
};


