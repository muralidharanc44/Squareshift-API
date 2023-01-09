const mongoose = require("mongoose");

const { Schema } = mongoose;

const cartSchema = new Schema(
    {
        productId: {
            type: String,
            require: true
        },
        discount_percentage: {
            type: Number,
            require: true
        },
        price: {
            type: Number,
            require: true
        },
        weight_in_grams: {
            type: Number,
            require: true
        },
    },
    { timestamps: true }
);

const cartsModel = mongoose.model("Cart", cartSchema)
module.exports = { cartsModel };
