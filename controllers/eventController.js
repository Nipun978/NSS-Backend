const Event = require("../models/Event");
const User = require("../models/User");

// @desc    Create a new event
// @route   POST /api/events
// @access  Private (Members only)
const createEvent = async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const event = new Event({
            title,
            description,
            date,
            createdBy: req.user._id, // The `protect` middleware should attach the user to `req`
        });

        const createdEvent = await event.save();
        res.status(201).json(createdEvent);
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({
            message: "Failed to create event",
            error: error.message,
        });
    }
};

// @desc    Get all events (for all users)
// @route   GET /api/events
// @access  Public (Guests, Members, Admins)
// const getEvents = async (req, res) => {
//     try {
//         let query = { status: "approved" }; // Default to showing only approved events
//         if (req.user && req.user.role === "admin") {
//             // Admins can see all events (pending, approved, rejected)
//             query = {};
//         }
//         const events = await Event.find(query)
//             .populate("createdBy", "username")
//             .populate("approvedBy", "username"); // Populate creator and approver info
//         res.json(events);
//     } catch (error) {
//         console.error("Error getting events:", error);
//         res.status(500).json({
//             message: "Failed to get events",
//             error: error.message,
//         });
//     }
// };

// @desc    Get all events (for all users)
// @route   GET /api/events
// @access  Private Route for authenticated user.
const getEvents = async (req, res) => {
    try {
        let query = {};

        const events = await Event.find(query).populate('createdBy', 'username').populate('approvedBy', 'username'); // Populate creator and approver info
        res.json(events);
    } catch (error) {
        console.error("Error getting events:", error);
        res.status(500).json({ message: "Failed to get events", error: error.message });
    }
};

// @desc    Get events created by the logged-in user (for Members)
// @route   GET /api/events/me
// @access  Private (Members only)
const getMyEvents = async (req, res) => {
    try {
        const events = await Event.find({ createdBy: req.user._id })
            .populate("createdBy", "username")
            .populate("approvedBy", "username");
        res.json(events);
    } catch (error) {
        console.error("Error getting user's events:", error);
        res.status(500).json({
            message: "Failed to get user's events",
            error: error.message,
        });
    }
};

// @desc    Update event status (Approve/Reject) - Admin only
// @route   PUT /api/events/:id/status
// @access  Private (Admins only)
const updateEventStatus = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        const { status } = req.body;
        if (!["pending", "approved", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        event.status = status;
        event.approvedBy = req.user._id; // Set the approving admin

        await event.save();

        res.json({ message: "Event status updated successfully", event });
    } catch (error) {
        console.error("Error updating event status:", error);
        res.status(500).json({
            message: "Failed to update event status",
            error: error.message,
        });
    }
};

module.exports = {
    createEvent,
    getEvents,
    getMyEvents,
    updateEventStatus,
};
