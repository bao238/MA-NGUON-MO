const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/booking_controller');

// Hiển thị trang booking
router.get('/', BookingController.showBooking);

// API endpoints
router.get('/list', BookingController.getAllBookings);
router.post('/create', BookingController.createBooking);
router.put('/update/:id', BookingController.updateBooking);
router.delete('/cancel/:id', BookingController.cancelBooking);

module.exports = router; 