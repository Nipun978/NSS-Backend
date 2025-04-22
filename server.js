const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes"); // ADD THIS LINE

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose
    .connect(
        "mongodb+srv://purumehan978:NSS_DB@nss-db.at1i4om.mongodb.net/?retryWrites=true&w=majority&appName=NSS-Db",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => {
        console.log("MongoDB connected ✅");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
        console.error("MongoDB connection error ❌", err.message);
    });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);

app.get("/", (req, res) => {
    res.send("Backend Run Succ ");
}); // ADD THIS LINE

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
