const { SAFE_FIELDS } = require('../utils/sanitization')
const { errorResponse, successResponse } = require("../utils/response");
const User = require("../models/user")
const ConnectionRequest = require("../models/request");


const getFeed = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;

        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;

        const loggedInUser = req.user;

        const requestArray = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ]
        }).select("fromUserId toUserId")

        let dontShowUser = new Set();
        requestArray.forEach((e) => {
            dontShowUser.add(e.fromUserId);
            dontShowUser.add(e.toUserId);
        })

        const feed = await User.find({
            $and: [
                { _id: { $nin: Array.from(dontShowUser) } },
                { _id: { $ne: loggedInUser._id } }
            ]
        }).select(SAFE_FIELDS)
            .skip(skip)
            .limit(limit);

        res.send(successResponse(feed));
    }
    catch (error) {
        res.status(400).json(errorResponse(error));
    }
}

const getAllConnections = async (req, res) => {
    try {
        const loggedInUser = req.user;

        const conncetionRequestArray = await ConnectionRequest
            .find({
                $or: [
                    { toUserId: loggedInUser._id },
                    { fromUserId: loggedInUser._id }
                ],
                $and: [
                    { status: "accepted" }
                ]
            })
            .populate("fromUserId", SAFE_FIELDS)
            .populate("toUserId", SAFE_FIELDS)


        res.json(successResponse(conncetionRequestArray))
    }
    catch (error) {
        res.status(400).json(errorResponse(error));
    }
}

const getConnectionRequests = async (req, res) => {
    try {
        const loggedInUser = req.user;
        const reqType = req.params.type;

        const ALLOWED_REQ_TYPE = ["sent", "recieved"]
        if (!ALLOWED_REQ_TYPE.includes(reqType)) {
            throw new Error("You can only see sent/recieved request")
        }
        let connectionRequest
        if (reqType == "recieved") {
            connectionRequest = await ConnectionRequest.find({
                $and: [
                    { toUserId: loggedInUser._id },
                    { status: "interested" }

                ]
            }).populate("fromUserId", SAFE_FIELDS)
        }
        else {
            connectionRequest = await ConnectionRequest.find({
                $and: [
                    { fromUserId: loggedInUser._id },
                    { status: "interested" }

                ]
            }).populate("toUserId", SAFE_FIELDS)
        }

        res.json(successResponse(connectionRequest))
    }
    catch (error) {
        res.status(400).json(errorResponse(error));
    }
}

module.exports = {
    getFeed, getAllConnections, getConnectionRequests
}