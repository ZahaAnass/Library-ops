const mongoose = require("mongoose")

const borrowShema = mongoose.Schema({
    bookId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    borrowDate: {
        type: Date,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    returnedAt: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        enum: ["borrowed", "returned"],
        default: "borrowed"
    }
})

module.exports = mongoose.model("Borrow", borrowShema)