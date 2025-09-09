const express = require('express')

const router = express.Router()

const chatController = require("../controllers/chat.controller")

router.post("/chat", chatController.handleChat)

module.exports = router