const Monitor = require("../models/Monitor");
const checkMonitor = require("../services/monitorService");

const runMonitorCheck = async (req, res) => {
    try {
        
        const monitor = await Monitor.findById(req.params.monitorId);

        if (!monitor) {
            return res.status(404).json({
                message: "Monitor not found"
            });
        }

        
        const result = await checkMonitor(monitor);

        res.status(200).json({
            message: "Monitor check completed",
            monitor: monitor.name,
            result
        });

    } catch (error) {
        res.status(500).json({
            message: "Monitor check failed",
            error: error.message
        });
    }
};

module.exports = { runMonitorCheck };