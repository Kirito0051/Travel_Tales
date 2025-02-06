import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

// Validation middleware
const validateBooking = (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "Required fields missing" });
  }
  next();
};

router.post("/", validateBooking, async (req, res) => {
  try {
    console.log("Received Booking Data:", JSON.stringify(req.body, null, 2)); // Pretty print JSON

    const { name, email, phone, flight, car, hotel } = req.body;

    // Check if `flight` data exists and is structured correctly
    if (!flight || !flight.airline || !flight.flightNumber) {
      console.warn("Warning: Flight data is missing or incomplete:", flight);
    }

    const booking = new Booking({
      name,
      email,
      phone,
      flight: flight || null, // Ensure null if missing
      car: car || null,
      hotel: hotel || null,
    });

    const savedBooking = await booking.save();
    console.log("Booking saved:", JSON.stringify(savedBooking, null, 2));

    res.status(201).json({
      message: "Booking created successfully",
      booking: savedBooking,
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({
      message: "Booking failed",
      error: error.message,
    });
  }
});

export default router;
