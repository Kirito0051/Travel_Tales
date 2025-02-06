import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  flight: {
    airline: String,
    flightNumber: String,
    origin: String,
    destination: String,
    price: String,
    class: String,
  },
  car: Object,
  hotel: Object,
});

// Fix the export:
const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
