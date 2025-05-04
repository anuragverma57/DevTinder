const express = require('express')
const userContoller = require("../contollers/userController");
const { userAuth } = require("../middlewares/userAuth")
const userRouter = express.Router();

userRouter.get("/feed", userAuth, userContoller.getAllUser);
// userRouter.get("/connections",);
// userRouter.get("/requests-recieved",);
// userRouter.get("/requests-sent",);

module.exports = userRouter;