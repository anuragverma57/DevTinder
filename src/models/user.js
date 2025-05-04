const mongoose = require("mongoose")
const validators = require("validator")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const SECRET_KEY = "DEV@TINDER#12-09-2002"
//  Use camelCasing - good practice
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3

    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validators.isEmail(value)) throw new Error("Email is not valid");
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validators.isStrongPassword(value)) throw new Error("Password is not Strong");
        }
    },
    age: {
        type: Number,
        validate(value) {
            if (value < 14)
                throw new Error("Go to school Kid");
        }
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
    },
    photoURL: {
        type: String,
        validate(value) {
            if (!validators.isURL(value)) throw new Error("Photo URL is not valid");
        }
    },
    about: {
        type: String,
        default: "Hey there I am using devTinder"
    },
    skills: {
        type: [String],
    },
}, {
    timestamps: true
}
)

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: "1d" });
    return token;
}

userSchema.methods.validatePassword = async function (password) {
    const user = this;
    const isCorrectPassword = await bcrypt.compare(password, user.password)
    return isCorrectPassword;
}


const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel
