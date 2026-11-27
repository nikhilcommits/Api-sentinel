
const express = require("express");

const router = express.Router();

const {
    createMonitor,
    getMonitors
} = require("../controllers/monitorController");

const {
    runMonitorCheck
} = require("../controllers/monitorCheckController");

const {
    getMonitorHistory
} = require("../controllers/monitorHistoryController");

// Create a monitor
router.post("/", createMonitor);

// Get all monitors
router.get("/", getMonitors);

// Check a monitor
router.get("/:monitorId/check", runMonitorCheck);

// Get monitoring history
router.get("/:monitorId/history", getMonitorHistory);

module.exports = router;
