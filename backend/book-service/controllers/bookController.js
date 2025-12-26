const Book = require("../models/Book")

// @desc    Get all books
// @route   GET /api/books
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find()
        if (!books) {
            return res.status(404).json({ message: "No books found" })
        }
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// @desc    Get a single book
// @route   GET /api/books/:id
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        if (!book) {
            return res.status(404).json({ message: "Book not found" })
        }
        res.status(200).json(book)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// @desc    Create a new book
// @route   POST /api/books
const createBook = async (req, res) => {
    try {
        const { title, author, isbn, pageCount, description, coverImage } = req.body
        const book = await Book.findOne({ isbn })
        if (book) {
            return res.status(400).json({ message: "Book already exists" })
        }
        const newBook = await Book.create({ title, author, isbn, pageCount, description, coverImage })
        if (!newBook) {
            return res.status(400).json({ message: "Book not created" })
        }
        res.status(201).json(newBook)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// @desc    Update a book
// @route   PUT /api/books/:id
const updateBook = async (req, res) => {
    try {
        const { title, author, isbn, pageCount, description, coverImage } = req.body
        const bookIsbn = await Book.findOne({ isbn })
        if (bookIsbn && bookIsbn._id.toString() !== req.params.id) {
            return res.status(400).json({ message: "Book already exists with this isbn" })
        }
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, { title, author, isbn, pageCount, description, coverImage }, { new: true })
        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" })
        }
        res.status(200).json(updatedBook)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// @desc    Delete a book
// @route   DELETE /api/books/:id
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id)
        if (!book) {
            return res.status(404).json({ message: "Book not found" })
        }
        res.status(200).json({ message: "Book deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// @desc    Update book status
// @route   PATCH /api/books/:id
const updateBookStatus = async (req, res) => {
    try {
        const { status } = req.body
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, { status }, { new: true })
        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" })
        }
        res.status(200).json(updatedBook)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    updateBookStatus
}
