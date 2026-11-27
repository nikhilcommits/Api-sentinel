const express = require("express");

const router = express.Router();

const {createMonitor,getMonitors} = require("../controllers/monitorController");


router.post("/", createMonitor);


router.get("/", getMonitors);

module.exports = router;