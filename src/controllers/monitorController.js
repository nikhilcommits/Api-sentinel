
const Monitor = require("../models/Monitor");

// CREATE MONITOR
const createMonitor = async (req, res) => {
    try {
        const monitor = await Monitor.create(req.body);

        res.status(201).json({
            message: "Monitor created successfully",
            monitor
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create monitor",
            error: error.message
        });
    }
};


// GET ALL MONITORS
const getMonitors = async (req, res) => {
    try {
        const monitors = await Monitor.find();

        res.status(200).json({
            count: monitors.length,
            monitors
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch monitors",
            error: error.message
        });
    }
};


// UPDATE MONITOR
const updateMonitor = async (req, res) => {
    try {
        const monitor = await Monitor.findByIdAndUpdate(
            req.params.monitorId,
            req.body,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!monitor) {
            return res.status(404).json({
                message: "Monitor not found"
            });
        }

        res.status(200).json({
            message: "Monitor updated successfully",
            monitor
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update monitor",
            error: error.message
        });
    }
};


module.exports = {
    createMonitor,
    getMonitors,
    updateMonitor
};
