const ConnectionRequest = require("../models/request");
const User = require("../models/user");
const { errorResponse, successResponse } = require("../utils/response");
const { sanitizeUser } = require("../utils/sanitization");
const { validateConnectionRequestData, validateRespondToRequestData } = require("../utils/validation")


const sendConnectionRequest = async (req, res) => {
    try {
        validateConnectionRequestData(req);
        const { status, userId } = req.params;

        let loggedInUser = req.user;
        let toUser = await User.findById(userId);

        if (!toUser) {
            throw new Error("User not found");
        }

        const existingReq = await ConnectionRequest.findOne({
            $or: [
                {
                    fromUserId: loggedInUser._id,
                    toUserId: userId
                },
                {
                    fromUserId: userId,
                    toUserId: loggedInUser._id
                }

            ]
        })

        if (existingReq) {
            throw new Error("Request already present in db");
        }

        const newRequest = new ConnectionRequest({
            fromUserId: loggedInUser._id,
            toUserId: userId,
            status: status
        })
        await newRequest.save();

        res.send(successResponse(newRequest));
    } catch (error) {
        res.status(400).json(errorResponse(error));
    }
}

const reviewConnectionRequest = async (req, res) => {
    try {
        validateRespondToRequestData(req);
        const loggedInUser = req.user;
        const requestId = req.params.requestId;
        const status = req.params.status;

        const existingReq = await ConnectionRequest.findById(requestId);

        if (!existingReq) {
            throw new Error("Request not found");
        }

        if (existingReq.status != "interested") {
            throw new Error("Only interested requests can be accepted or rejected")
        }

        if (existingReq.fromUserId.equals(loggedInUser._id)) {
            throw new Error("You yourself can't accept/reject your request");
        }

        existingReq.status = status;
        await existingReq.save();

        res.send(successResponse(existingReq, `Request ${status} successfully`));
    } catch (error) {
        res.status(400).json(errorResponse(error));
    }
}
module.exports = {
    sendConnectionRequest, reviewConnectionRequest,
}