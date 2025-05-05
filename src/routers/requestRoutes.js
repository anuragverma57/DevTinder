const express = require('express')
const { userAuth } = require("../middlewares/userAuth")
const requestRouter = express.Router();

const requestController = require("../contollers/requestController")


requestRouter.post("/send/:status/:userId", userAuth, requestController.sendConnectionRequest);
requestRouter.post("/:status/:requestId", userAuth, requestController.respondToRequest);


module.exports = requestRouter;