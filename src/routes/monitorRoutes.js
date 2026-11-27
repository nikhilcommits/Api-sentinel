const express = require("express");

const router = express.Router();

const {
    createMonitor,
    getMonitors
} = require("../controllers/monitorController");

const {
    runMonitorCheck
} = require("../controllers/monitorCheckController");

// Create a new monitor
router.post("/", createMonitor);

// Get all monitors
router.get("/", getMonitors);

// Check a monitor
router.get("/:monitorId/check", runMonitorCheck);

module.exports = router;