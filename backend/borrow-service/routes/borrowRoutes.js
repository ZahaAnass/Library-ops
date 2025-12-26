const express = require("express")
const router = express.Router()
const { borrowBook, returnBook, getMyBorrows } = require("../controllers/borrowController")

router.post("/", borrowBook)
router.post("/return/:borrowId", returnBook)
router.get("/user/:userId", getMyBorrows)

module.exports = router
