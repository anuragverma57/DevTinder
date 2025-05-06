const express = require('express')
const { userAuth } = require("../middlewares/userAuth")
const requestRouter = express.Router();
const requestController = require("../contollers/requestController")

requestRouter.post("/send/:status/:userId", userAuth, requestController.sendConnectionRequest);
requestRouter.post("/review/:status/:requestId", userAuth, requestController.reviewConnectionRequest);


module.exports = requestRouter;