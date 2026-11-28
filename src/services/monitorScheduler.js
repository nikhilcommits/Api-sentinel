
const cron = require("node-cron");

const Monitor = require("../models/Monitor");
const checkResult = require("../models/checkResult");
const Incident = require("../models/Incident");
const checkMonitor = require("./monitorService");

const startMonitorScheduler = () => {

    // Run the scheduler every minute
    cron.schedule("* * * * *", async () => {

        console.log("Running automatic monitor checks...");

        try {

            // Find all active monitors
            const monitors = await Monitor.find({
                isActive: true
            });

            for (const monitor of monitors) {

                // Find the latest monitoring result
                const lastCheck = await checkResult.findOne({
                    monitor: monitor._id
                }).sort({ checkedAt: -1 });

                // Calculate the monitoring interval
                const interval = monitor.checkInterval * 60 * 1000;

                // Determine whether the monitor is due
                const isDue = !lastCheck ||
                    (Date.now() - new Date(lastCheck.checkedAt).getTime()) >= interval;

                if (!isDue) {
                    continue;
                }

                try {

                    // Perform API health check
                    const result = await checkMonitor(monitor);

                    // Save monitoring result in MongoDB
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

                    // Handle DOWN status
                    if (result.status === "DOWN") {

                        // Check for an existing ongoing incident
                        const existingIncident = await Incident.findOne({
                            monitor: monitor._id,
                            status: "ONGOING"
                        });

                        // Create incident only if none exists
                        if (!existingIncident) {

                            await Incident.create({
                                monitor: monitor._id,
                                status: "ONGOING",
                                reason: result.error || "API is unavailable"
                            });

                            console.log(
                                `${monitor.name}: Incident created`
                            );
                        }

                    }

                    // Handle UP status and recovery
                    else if (result.status === "UP") {

                        // Find an ongoing incident
                        const existingIncident = await Incident.findOne({
                            monitor: monitor._id,
                            status: "ONGOING"
                        });

                        // Resolve the incident if API recovered
                        if (existingIncident) {

                            existingIncident.status = "RESOLVED";
                            existingIncident.resolvedAt = new Date();

                            await existingIncident.save();

                            console.log(
                                `${monitor.name}: Incident resolved`
                            );
                        }
                    }

                } catch (error) {

                    console.error(
                        `Monitoring failed for ${monitor.name}:`,
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
