import express from "express";
import Booking from "./models/Booking.js"; // Make sure you have a Booking model!

const router = express.Router();

// ✅ Create a new booking
router.post("/", async (req, res) => {
  try {
    const { name, email, destination, date } = req.body;

    const newBooking = new Booking({ name, email, destination, date });
    await newBooking.save();

    res.status(201).json({ message: "Booking successful!" });
  } catch (error) {
    res.status(500).json({ error: "Booking failed", details: error.message });
  }
});

// ✅ Get all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch bookings", details: error.message });
  }
});

export default router;
