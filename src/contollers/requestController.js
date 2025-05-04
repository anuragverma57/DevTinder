const User = require("../models/user")


const sendConnectionRequest = async (req, res) => {
    try {
        res.send("Request Send")
    } catch (err) {
        res.send("Error : " + err.message);
    }
}
const ignore = async (req, res) => {
    try {
        res.send("Person Ignored")
    } catch (err) {
        res.send("Error : " + err.message);
    }
}
const acceptRequest = async (req, res) => {
    try {
        const user = req.user;
        res.send("Request Accepted")
    } catch (err) {
        res.send("Error : " + err.message);
    }
}
const rejectRequest = async (req, res) => {
    try {
        const user = req.user;
        res.send("Request Accepted")
    } catch (err) {
        res.send("Error : " + err.message);
    }
}
module.exports = {
    rejectRequest, sendConnectionRequest, acceptRequest, ignore
}