var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const MessageSchema = new Schema({
    from_id: {
        type: String,
    },

    product_id: {
        type: String
    },

    to_id: {
        type: String
    },

    created_at: {
        type: Date,
        required: true
    },
})


module.exports = mongoose.model('Messages', MessageSchema);