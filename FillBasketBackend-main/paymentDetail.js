// models/Payment.js

const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    paypalPaymentId: {
        type: String,
        required: true,
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
    }],
    // Other payment details like total amount, shipping address, etc.
});

const Payment = mongoose.model('Payment_Detail', paymentSchema);

module.exports = Payment;
