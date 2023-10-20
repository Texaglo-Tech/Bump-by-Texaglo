var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    user_id: {
        type: String,
    },

    username: {
        type: String,
    },

    email: {
        type: String
    },

    wallet: {
        type: String
    },

    amount: {
        type: String
    },

    status: {               // 0: milestone 1: release 2: refund
        type: Number,   
        default: 0
    },

    product_id: {
        type: String
    },

    transaction: {
        type: String
    },

    action_id: {
        type: String,
    },

    metadata: {
        type: Object,
    },

    nft_status: {
        type: String,
    },

    created_at: {
        type: Date,
        required: true
    },

})


module.exports = mongoose.model('Payment', PaymentSchema);