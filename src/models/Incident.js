
const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema({

    monitor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Monitor",
        required: true
    },

    startedAt: {
        type: Date,
        default: Date.now
    },

    resolvedAt: {
        type: Date,
        default: null
    },

    status: {
        type: String,
        enum: ["ONGOING", "RESOLVED"],
        default: "ONGOING"
    },

    reason: {
        type: String,
        default: "API is unavailable"
    }

}, { timestamps: true });

const Incident = mongoose.model("Incident", incidentSchema);

module.exports = Incident;
