const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Helper function to generate JWT
const generateToken = (id, rememberMe = false) => {
    const expiresIn = "30d";
    return jwt.sign({ id }, "your-super-secret-key", {
        expiresIn: expiresIn,
    });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    const { username, email, password, firstName, lastName } = req.body; // Updated

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Create user
    const user = await User.create({
        username,
        email,
        password,
        firstName, //added first name
        lastName, //added last name
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            firstName: user.firstName, // Send these back on register as well (may be null)
            lastName: user.lastName, // Send these back on register as well (may be null)
            profilePic: user.profilePic, // Send these back on register as well (may be null)
            firstLogin: user.firstLogin, // Include firstLogin in the response
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: "Invalid user data" });
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password, rememberMe } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            profilePic: user.profilePic,
            firstLogin: user.firstLogin, // Include firstLogin in the response
            token: generateToken(user._id, rememberMe),
        });
    } else {
        res.status(400).json({ message: "Invalid credentials" });
    }
};

module.exports = {
    registerUser,
    loginUser,
};
