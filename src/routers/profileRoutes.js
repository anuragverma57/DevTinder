const express = require('express')
const { userAuth } = require("../middlewares/userAuth")
const profileController = require("../contollers/profileController")
const profileRouter = express.Router();


profileRouter.get("/view", userAuth, profileController.getUserProfile);
profileRouter.patch("/update", userAuth, profileController.updateUser);
// profileRouter.patch("/password", userAuth);

module.exports = profileRouter;