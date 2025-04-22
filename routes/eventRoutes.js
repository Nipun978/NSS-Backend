const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
    createEvent,
    getEvents,
    getMyEvents,
    updateEventStatus,
} = require("../controllers/eventController");

router.post("/", protect, createEvent); // Members can create events
router.get("/", getEvents); // All users can view approved events
router.get("/me", protect, getMyEvents); // Members can see their events
router.put("/:id/status", protect, updateEventStatus); // Admins can update event status

module.exports = router;
