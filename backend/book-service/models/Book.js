const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true,
        unique: true
    },
    pageCount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["available", "borrowed"],
        default: "available"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Book", bookSchema)