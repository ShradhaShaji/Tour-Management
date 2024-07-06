import express from "express";
import {createTour, updateTour, deleteTour, getSingleTour, getAllTour, getTourBySearch, getFeaturedTour, getTourCount} from './../controllers/tourController.js';
import { verifyAdmin} from '../utils/verifyToken.js';


const router = express.Router();

// create new tour
router.post("/",createTour);

// update new tour
router.put("/:id",updateTour);

// delete new tour
router.delete("/:id",deleteTour);

// get single  tour
router.get("/:id",getSingleTour);

// get all tour
router.get("/",getAllTour);

// get tour
router.get("/search/getTourBySearch",getTourBySearch);
router.get("/search/getFeaturedTours",getFeaturedTour);
router.get("/search/getTourCount", getTourCount);

export default router;