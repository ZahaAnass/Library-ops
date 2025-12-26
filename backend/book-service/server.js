const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const cors = require("cors")
const bookRoutes = require("./routes/bookRoutes")

dotenv.config()
const app = express()

// Middleware
app.use(express.json())
app.use(cors('*'))

// Database Connection
connectDB()

// Routes
app.use("/api/books", bookRoutes)

const PORT = process.env.PORT || 4002
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
