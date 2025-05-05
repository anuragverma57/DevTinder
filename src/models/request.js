const mongoose = require('mongoose')



const requestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    status: {
        type: String,
        enum: {
            values: ["accepted", "rejected", "interested", "ignored"],
            message: `{value} is not allowed as status`
        },
        required: true,
    }
})

const RequestModel = mongoose.model("Request", requestSchema)

module.exports = RequestModel;