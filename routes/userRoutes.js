const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { updateUserProfile } = require("../controllers/userController");
const User = require("../models/User");

// router.put("/profile/test", async (req, res) => {
//     console.log("Test route called"); // Add this line
//     try {
//         const user = await User.findById(req.body.userId); // Assuming you send the userId in the body
//         if (user) {
//             user.firstName = req.body.firstName || user.firstName;
//             user.lastName = req.body.lastName || user.lastName;
//             user.profilePic = req.body.profilePic || user.profilePic;
//             const updatedUser = await user.save();
//             res.json({
//                 message: "Profile updated successfully",
//                 user: updatedUser,
//             });
//         } else {
//             res.status(404).json({ message: "User not found" });
//         }
//     } catch (error) {
//         console.error("Error in test route:", error);
//         res.status(500).json({
//             message: "Error updating profile",
//             error: error.message,
//         });
//     }
// });

// router.put("/profile", protect, updateUserProfile);

router.put("/profile", protect, async (req, res) => {
    console.log("updateProfile router called");
    console.log(req.user);
    return updateUserProfile(req, res);
});

module.exports = router;
