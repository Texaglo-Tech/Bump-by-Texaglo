var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt');

const UserSchema = new Schema({
    username: {
        type: String,
        index: {
            unique: true
        },
        required: true
    },
    email: {
        type: String
    }, 
    phone: {
        type: String
    },
    password: {
        type: String,
        required: true
    },

    refer: {
        type: [Object],
        default: []
    },

    points: {
        type: Number,
        default: 0
    },

    scans_cnt: {
        type: Number,
        default: 0
    },

    clicks_cnt: {
        type: Number,
        default: 0
    },

    customer_id: {
        type: String,
    },

    stripe_account:{
        type: String
    },

    secretKey: {
        type: String,
    },

    publicKey: {
        type: String,
    },

    created_at: {
        type: Date,
        required: true
    },
    updated_at: {
        type: Date,
        required: true
    },
    last_login: Date
})

UserSchema.methods.comparePassword = function (input, callback) {
    bcrypt.compare(input, this.password, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);