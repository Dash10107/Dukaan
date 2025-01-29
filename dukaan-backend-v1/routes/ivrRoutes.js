// ivrCtrl.js (route file)

const express = require("express");
const { handleIncomingMessage } = require("../controller/ivrCtrl");
const router = express.Router();

router.post('/webhook', handleIncomingMessage);

module.exports = router;