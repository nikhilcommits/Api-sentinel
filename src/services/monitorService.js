const axios = require("axios");

const checkMonitor = async (monitor) => {
    const startTime = Date.now();

    try {
        const response = await axios({
            method: monitor.method,
            url: monitor.url,
            timeout: monitor.timeout,
            validateStatus: () => true
        });

        const responseTime = Date.now() - startTime;

        const isHealthy = response.status === monitor.expectedStatus;

        return {
            status: isHealthy ? "UP" : "DOWN",
            statusCode: response.status,
            responseTime: responseTime,
            error: null
        };

    } catch (error) {
        const responseTime = Date.now() - startTime;

        return {
            status: "DOWN",
            statusCode: error.response?.status || null,
            responseTime: responseTime,
            error: error.message
        };
    }
};

module.exports = checkMonitor;