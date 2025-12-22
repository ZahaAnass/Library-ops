const User = require("../models/User")

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }

        const newUser = await User.create({ username, email, password })
        const token = newUser.createJWT()

        res.status(201).json({ user: { id: newUser._id, username: newUser.username, email: newUser.email }, token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        const isPasswordValid = await user.comparePassword(password)
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" })
        }

        const token = user.createJWT()
        res.status(200).json({ user: { id: user._id, username: user.username, email: user.email }, token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}

module.exports = { registerUser, loginUser }