const express = require("express");
const cors = require("cors");

const monitorRoutes = require("./routes/monitorRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health route health
app.get("/api/health", (req, res) => {
    res.status(200).json({
        message: "API Sentinel is running",
        status: "healthy"
    });
});

// Monitor routes
app.use("/api/monitors", monitorRoutes);

module.exports = app;