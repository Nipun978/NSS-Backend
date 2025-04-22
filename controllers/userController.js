const User = require("../models/User");
const jwt = require("jsonwebtoken");

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.profilePic = req.body.profilePic || user.profilePic;

        if (user.firstLogin) {
            // If it's their first profile update, set firstLogin to false
            user.firstLogin = false;
        }

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            role: updatedUser.role,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            profilePic: updatedUser.profilePic,
            firstLogin: updatedUser.firstLogin, // Include firstLogin in the response
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    } 
};

module.exports = { updateUserProfile };
