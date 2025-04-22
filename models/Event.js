const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        date: { type: Date, required: true },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }, // Reference to the User who created the event
        approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the Admin who approved the event (can be null)
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        }, // Approval status
    },
    { timestamps: true }
); // Add createdAt and updatedAt timestamps

module.exports = mongoose.model("Event", eventSchema);
