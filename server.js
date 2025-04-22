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

const connect = async () => {
    try {
        const mongoConnect = await mongoose.connect(
            "mongodb+srv://purumehan978:NSS_DB@nss-db.at1i4om.mongodb.net/?retryWrites=true&w=majority&appName=NSS-Db",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("✅ MongoDB connected");
    } catch (e) {
        console.error("❌ MongoDB connection error:", e.message);
        process.exit(1); // optional: crash the app if DB isn't connected
    }
};

connect();


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);

app.get("/", (req, res) => {
    res.send("Backend Run Succ ");
}); // ADD THIS LINE

app.listen(5000, () => {
    console.log(`Server is running on port ${port}`);
});
