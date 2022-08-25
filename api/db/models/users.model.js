const mongoose = require('mongoose')
const {Schema} = mongoose

const ProductSchema = new Schema({
    userName: {
        type: String,
        required: [true, "Username is required"]
    },
    email:  {
        type: Number,
        required: [true, "email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    admin: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Product', ProductSchema)