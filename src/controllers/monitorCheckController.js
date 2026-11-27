
const Monitor = require("../models/Monitor");
const checkResult = require("../models/checkResult");
const checkMonitor = require("../services/monitorService");

const runMonitorCheck = async (req, res) => {
    try {
        // 1. Find the monitor using its MongoDB ID
        const monitor = await Monitor.findById(req.params.monitorId);

        // 2. Check whether the monitor exists
        if (!monitor) {
            return res.status(404).json({
                message: "Monitor not found"
            });
        }

        // 3. Execute the monitoring function
        const result = await checkMonitor(monitor);

        // 4. Save the monitoring result in MongoDB
        const savedResult = await checkResult.create({
            monitor: monitor._id,
            status: result.status,
            statusCode: result.statusCode,
            responseTime: result.responseTime,
            error: result.error
        });

        // 5. Send the response
        res.status(200).json({
            message: "Monitor check completed",
            monitor: monitor.name,
            result,
            savedResult
        });

    } catch (error) {
        res.status(500).json({
            message: "Monitor check failed",
            error: error.message
        });
    }
};

module.exports = { runMonitorCheck };
