const mongoose = require('mongoose')

const HotelSchema = mongoose.Schema( {
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true
    },
}, {timestamps: true})

module.exports = mongoose.model("Hotels", HotelSchema)