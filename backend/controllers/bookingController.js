import nodemailer from 'nodemailer'; // Import nodemailer here

import Booking from '../models/Booking.js';
import Payment from '../models/Payment.js';

// Create new booking and payment
// Create new booking and payment
export const createBooking = async (req, res) => {
    const { booking, payment } = req.body;

    const session = await Booking.startSession();
    session.startTransaction();

    try {
        const newBooking = new Booking(booking);
        const savedBooking = await newBooking.save({ session });

        const newPayment = new Payment({
            ...payment,
            userId: booking.userId,
            bookingId: savedBooking._id
        });
        await newPayment.save({ session });

        // Send email to the user
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'travelapp1104@gmail.com',
                pass: 'qiquclezidgukfnu'
            }
        });

        await transporter.sendMail({
            from: 'travelapp1104@gmail.com',
            to: booking.userEmail,
            subject: 'Booking Confirmation',
            text: 'Your booking is confirmed. Thank you for choosing our service.'
        });

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ success: true, message: "Your tour is booked", data: savedBooking });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        console.error('Error during booking and payment:', err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


// Get single booking
export const getBooking = async (req, res) => {
    const id = req.params.id;

    try {
        const book = await Booking.findById(id);
        res.status(200).json({ success: true, message: "Successful", data: book });
    } catch (err) {
        res.status(404).json({ success: false, message: "Not found" });
    }
};

// Get all bookings
export const getAllBooking = async (req, res) => {
    try {
        const book = await Booking.find();
        res.status(200).json({ success: true, message: "Successful", data: book });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
