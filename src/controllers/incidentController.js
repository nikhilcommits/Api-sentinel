
const Incident = require("../models/Incident");
const Monitor = require("../models/Monitor");

// GET INCIDENT HISTORY FOR A MONITOR
const getMonitorIncidents = async (req, res) => {
    try {
        const monitorId = req.params.monitorId;

        // Check whether the monitor exists
        const monitor = await Monitor.findById(monitorId);

        if (!monitor) {
            return res.status(404).json({
                message: "Monitor not found"
            });
        }

        // Retrieve all incidents for this monitor
        const incidents = await Incident.find({
            monitor: monitorId
        }).sort({ startedAt: -1 });

        res.status(200).json({
            monitor: monitor.name,
            count: incidents.length,
            incidents
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch incident history",
            error: error.message
        });
    }
};

module.exports = { getMonitorIncidents };
