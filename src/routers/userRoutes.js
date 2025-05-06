const express = require('express')
const userContoller = require("../contollers/userController");
const { userAuth } = require("../middlewares/userAuth")
const userRouter = express.Router();


userRouter.get("/feed", userAuth, userContoller.getFeed);
userRouter.get("/connections", userAuth, userContoller.getAllConnections);
userRouter.get("/requests/:type", userAuth, userContoller.getConnectionRequests);

module.exports = userRouter;