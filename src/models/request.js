const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    status: {
        type: String,
        enum: {
            values: ["accepted", "rejected", "interested", "ignored"],
            message: `{VALUE} is not allowed as status`
        },
        required: true,
    }
}, {
    timestamps: true
})

requestSchema.index({ fromUserId: 1 });
requestSchema.pre("save", function (next) {
    if (this.fromUserId.equals(this.toUserId)) {
        throw new Error("Can't send request to yourself")
    }
    next();
})

const RequestModel = mongoose.model("Request", requestSchema)

module.exports = RequestModel;