const express = require("express")
const router = express.Router()
const { getAllBooks, getBookById, createBook, updateBook, deleteBook, updateBookStatus } = require("../controllers/bookController")

router.get("/", getAllBooks)
router.get("/:id", getBookById)
router.post("/", createBook)
router.put("/:id", updateBook)
router.delete("/:id", deleteBook)
router.patch("/:id", updateBookStatus)

module.exports = router
