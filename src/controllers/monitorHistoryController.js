
const checkResult = require("../models/checkResult");

const getMonitorHistory = async (req, res) => {
    try {
        // Get monitor ID from URL
        const monitorId = req.params.monitorId;

        // Find all results belonging to this monitor
        const history = await checkResult.find({
            monitor: monitorId
        }).sort({ checkedAt: -1 });

        // Return monitoring history
        res.status(200).json({
            count: history.length,
            history
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch monitoring history",
            error: error.message
        });
    }
};

module.exports = { getMonitorHistory };
