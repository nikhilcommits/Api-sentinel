
require("dotenv").config();

const app = require("./src/app.js");
const connectDB = require("./src/config/db.js");

const startMonitorScheduler = require("./src/services/monitorScheduler");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        // Connect to MongoDB first
        await connectDB();

        // Start automatic monitoring
        startMonitorScheduler();

        // Start Express server
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Server startup failed:", error.message);
    }
};

startServer();
