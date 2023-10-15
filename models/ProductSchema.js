var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const ProductSchema = new Schema({
    product_id: {
        type: String,
        index: {
            unique: true
        },
        required: true
    },

    user_id: {
        type: String,
    },

    product_name: {
        type: String,
    },

    product_cost: {
        type: String
    }, 

    product_desc: {
        type: String
    },

    product_type: {
        type: String,
    },

    product_link: {
        type: String,
    },

    product_payment: {
        type: String,
    },

    product_qrcode: {
        type: String,
    },

    product_file: {
        type: String,
    },

    quantity: {
        type: Number,
        default: 1
    },

    item_imgs: {
        type: [String],
        default: []
    },

    background_color:{
        type: String
    },

    button1_color:{
        type: String
    },

    button2_color: {
        type: String
    },

    buy_color: {
        type: String
    },

    website:{
        type: String
    },

    link:{
        type: String
    },

    survey:{
        type: String
    },

    answers:{
        type: String
    },

    questions:{
        type: String
    },

    bot_file_path: {
        type: String
    },

    ai: {
        type: String
    },

    chatpdf_source: {
        type: String
    },

    wallet: {
        type: String,
    },

    payment_status: {       // 0: unclaimed,  1: claimed, 2: unpaid, 3: paid
        type: Number,
        default: 0    
    },

    buy_id: {
        type: String,        
    },

    created_at: {
        type: Date,
        required: true
    },
    
    
})


module.exports = mongoose.model('Product', ProductSchema);