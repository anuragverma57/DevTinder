const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validateEditProfileData, validateEditPasswordData } = require("../utils/validation");
const { errorResponse, successResponse } = require("../utils/response");
const { sanitizeUser } = require("../utils/sanitization");


const getUserProfile = async (req, res) => {
    try {
        const user = req.user
        const sanitizedUser = sanitizeUser(user)
        res.json(successResponse(sanitizedUser));
    }
    catch (error) {
        res.status(400).json(errorResponse(error));
    }
}

const updateProfile = async (req, res) => {
    try {
        if (!validateEditProfileData(req)) {
            throw new Error("Some fields are not editable")
        }
        const data = req.body
        const user = req.user

        const newData = await User.findByIdAndUpdate(user._id, data, {
            returnDocument: 'after',
            runValidators: true
        });

        const sanitizedUser = sanitizeUser(newData)
        res.json(successResponse(sanitizedUser, "Profile Updated Successfully"));
    } catch (error) {
        res.status(400).json(errorResponse(error));
    }
}


const changePassword = async (req, res) => {
    try {
        validateEditPasswordData(req)
        const { oldPassword, newPassword } = req.body
        const user = req.user

        const isValidPassword = await bcrypt.compare(oldPassword, user.password)

        if (!isValidPassword) {
            throw new Error("Incorrect password")
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);


        const newData = await User.findByIdAndUpdate(user._id, { password: hashedPassword }, {
            returnDocument: 'after',
            runValidators: true
        });

        const sanitizedUser = sanitizeUser(newData)
        res.json(successResponse(sanitizedUser, "Password Updated Successfully"));


    } catch (error) {
        res.status(400).json(errorResponse(error));
    }
}



module.exports = {
    getUserProfile, updateProfile, changePassword
}