const mongoose = require("mongoose");

const checkResultSchema = new mongoose.Schema({

    monitor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Monitor",
        required: true
    },

    status: {
        type: String,
        enum: ["UP", "DOWN"],
        required: true
    },

    statusCode: {
        type: Number,
        default: null
    },

    responseTime: {
        type: Number,
        required: true
    },

    error: {
        type: String,
        default: null
    },

    checkedAt: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true });

const checkResult = mongoose.model("CheckResult", checkResultSchema);

module.exports = checkResult;