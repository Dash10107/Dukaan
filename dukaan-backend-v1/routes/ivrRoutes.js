// ivrCtrl.js (route file)

const express = require("express");
const { handleIncomingMessage, startConversation } = require("../controller/ivrCtrl");
const router = express.Router();

router.post("/webhook", handleIncomingMessage);
router.post("/start-conversation", startConversation);
module.exports = router;