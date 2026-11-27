
const cron = require("node-cron");

const Monitor = require("../models/Monitor");
const checkResult = require("../models/checkResult");
const checkMonitor = require("./monitorService");

const startMonitorScheduler = () => {

    // Run this function every minute
    cron.schedule("* * * * *", async () => {

        console.log("Running automatic monitor checks...");

        try {
            // Find all active monitors
            const monitors = await Monitor.find({
                isActive: true
            });

            for (const monitor of monitors) {

                // Find the most recent check for this monitor
                const lastCheck = await checkResult.findOne({
                    monitor: monitor._id
                }).sort({ checkedAt: -1 });

                // Check whether this monitor is due
                const interval = monitor.checkInterval * 60 * 1000;

                const isDue = !lastCheck ||
                    (Date.now() - new Date(lastCheck.checkedAt).getTime()) >= interval;

                if (!isDue) {
                    continue;
                }

                try {
                    // Perform the health check
                    const result = await checkMonitor(monitor);

                    // Save the result
                    await checkResult.create({
                        monitor: monitor._id,
                        status: result.status,
                        statusCode: result.statusCode,
                        responseTime: result.responseTime,
                        error: result.error
                    });

                    console.log(
                        `${monitor.name}: ${result.status}`
                    );

                } catch (error) {
                    console.error(
                        `Check failed for ${monitor.name}:`,
                        error.message
                    );
                }
            }

        } catch (error) {
            console.error(
                "Scheduler error:",
                error.message
            );
        }
    });

    console.log("Monitor scheduler started");
};

module.exports = startMonitorScheduler;
