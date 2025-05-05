const Request = require("../models/request")
const { errorResponse } = require("../utils/response");


const sendConnectionRequest = async (req, res) => {
    try {
        const loggedInUser = req.user
        res.send("Request Send")
    } catch (error) {
        res.status(400).json(errorResponse(error));
    }
}
const respondToRequest = async (req, res) => {
    try {
        const user = req.user;
        res.send("Request Accepted")
    } catch (error) {
        res.status(400).json(errorResponse(error));
    }
}
module.exports = {
    sendConnectionRequest, respondToRequest,
}