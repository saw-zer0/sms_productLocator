const mongoose = require('mongoose')
const {Schema} = mongoose
mongoose.set("debug", true)
const ProductSchema = new Schema({
    name: String,
    description: String,
    category: String,
    isleNum: {
        type: Number,
        required: [true, "isle number cannot be blank"]
    },
    side: {
        type: String,
        required: [true, "Side cannot be blank"],
        enum: {
            values: ["RIGHT", "LEFT"],
            message: "Select RIGHT or LEFT side"
        },
    },
    row: {
        type: Number,
        required: [true, "Row cannot be blank"]
    }
})

module.exports = mongoose.model('Product', ProductSchema)