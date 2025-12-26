const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const cors = require('cors');
const userRoutes = require("./routes/userRoutes")

dotenv.config()
const app = express()

// Middleware
app.use(express.json())
app.use(cors("*"))

// Database Connection
connectDB()

// Routes
app.use("/api/users", userRoutes)

const PORT = process.env.PORT || 4001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))