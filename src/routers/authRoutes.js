const express = require('express')
const authController = require("../contollers/authController")
const authRouter = express.Router();

authRouter.post("/signup", authController.signUp);
authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logOut);

module.exports = authRouter;