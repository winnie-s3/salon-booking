const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    dateTime: { type: Date, required: true },
    service: { type: String, required: true }
});

module.exports = mongoose.model('Reservation', reservationSchema);
