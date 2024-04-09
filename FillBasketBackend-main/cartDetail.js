const mongoose = require("mongoose");

const cartDetail = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProductDetail'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
});

const Cart = mongoose.model('Cart', cartDetail);