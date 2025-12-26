const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const cors = require("cors")
const borrowRoutes = require("./routes/borrowRoutes")

dotenv.config()
const app = express()

// Middleware
app.use(express.json())
app.use(cors('*'))

// Database Connection
connectDB()

// Routes
app.use("/api/borrows", borrowRoutes)

const PORT = process.env.PORT || 4003
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
