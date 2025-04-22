// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const protect = async (req, res, next) => {
//     let token;

//     if (
//         req.headers.authorization &&
//         req.headers.authorization.startsWith("Bearer")
//     ) {
//         try {
//             // Get token from header
//             token = req.headers.authorization.split(" ")[1];

//             // Verify token
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);

//             // Get user from the token
//             req.user = await User.findById(decoded.id).select("-password");
//             console.log("protect middleware called");
//             next();
//         } catch (error) {
//             console.error(error);
//             res.status(401).json({ message: "Not authorized, invalid token" });
//         }
//     }

//     if (!token) {
//         res.status(401).json({ message: "Not authorized, no token" });
//     }
// };

// module.exports = { protect };

const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    let token;

    console.log("protect middleware called"); //Add this

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            req.user = await User.findById(decoded.id).select("-password");

            console.log("User found", req.user); //Add This

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: "Not authorized, invalid token" });
        }
    }

    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};

module.exports = { protect };
