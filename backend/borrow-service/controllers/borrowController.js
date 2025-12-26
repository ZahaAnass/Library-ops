const Borrow = require("../models/Borrow")
const axios = require("axios")


// @desc Borrow a book
// @route POST /api/borrows
const borrowBook = async (req, res) => {
    try {
        const { bookId, userId } = req.body

        const bookResponse = await axios.get(`${process.env.BOOK_SERVICE_URL}/${bookId}`)
        const book = bookResponse.data

        if (!book) {
            return res.status(404).json({ message: "Book not found" })
        }

        if (book.status === "borrowed") {
            return res.status(400).json({ message: "Book is already borrowed" })
        }

        const borrow = new Borrow({
            bookId,
            userId,
            borrowDate: new Date(),
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // borrow 7 days
            status: "borrowed"
        })

        await borrow.save()

        await axios.patch(`${process.env.BOOK_SERVICE_URL}/${bookId}`, { status: "borrowed" })

        res.status(201).json({ message: "Book borrowed successfully" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}

// @desc Return a book
// @route POST /api/borrows/return/:borrowId
const returnBook = async (req, res) => {
    try {
        const { borrowId } = req.params
        const borrow = await Borrow.findById(borrowId)

        if (!borrow) {
            return res.status(404).json({ message: "Borrow not found" })
        }

        if (borrow.status === "returned") {
            return res.status(400).json({ message: "Book is already returned" })
        }

        await borrow.updateOne({ 
            status: "returned", 
            returnedAt: new Date() 
        });
        
        await axios.patch(`${process.env.BOOK_SERVICE_URL}/${borrow.bookId}`, { status: "available" })
        
        res.status(200).json({ message: "Book returned successfully" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}

// @desc Get borrow history for a user
// @route GET /api/borrows/user/:userId
const getMyBorrows = async (req, res) => {
    try {
        const { userId } = req.params
        const borrows = await Borrow.find({ userId })

        if (!borrows) {
            return res.status(404).json({ message: "Borrow not found" })
        }
        
        res.status(200).json(borrows)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}

module.exports = {
    borrowBook,
    returnBook,
    getMyBorrows
}
