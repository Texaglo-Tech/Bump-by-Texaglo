var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const MembershipSchema = new Schema({
    user_id: {
        type: String,
    },

    product_id: {
        type: String
    },

    fee: {
        type: String,
    },

    percent: {
        type: String,
    },

    created_at: {
        type: Date,
        required: true
    },
})


module.exports = mongoose.model('Membership', MembershipSchema);