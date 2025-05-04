const express = require('express')
const { userAuth } = require("../middlewares/userAuth")
const requestRouter = express.Router();

const requestController = require("../contollers/requestController")


requestRouter.post("/send/interested/:userId", userAuth, requestController.sendConnectionRequest);
requestRouter.post("/send/ignored/:userId", userAuth, requestController.ignore);
requestRouter.post("/send/accepted/:requestId", userAuth, requestController.acceptRequest);
requestRouter.post("/send/rejected/:requestId", userAuth, requestController.rejectRequest);


module.exports = requestRouter;