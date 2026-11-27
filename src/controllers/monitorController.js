
const Monitor = require("../models/Monitor");


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



module.exports = {
    createMonitor,
    getMonitors
};
