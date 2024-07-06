import express from 'express';

import { verifyUser} from "../utils/verifyToken.js";
import { createBooking, getBooking, getAllBooking } from '../controllers/bookingController.js';

const router = express.Router();
router.post("/", createBooking);
router.get("/:id", getBooking);
router.get("/", getAllBooking);

export default router;
