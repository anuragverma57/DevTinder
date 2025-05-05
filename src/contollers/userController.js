const { validateSignUpData, validateLogInData } = require('../utils/validation')
const { errorResponse } = require("../utils/response");
const User = require("../models/user")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const getAllUser = async (req, res) => {
    try {
        const users = await User.find({});
        res.send({
            dataLength: users.length,
            data: users
        });
    }
    catch (error) {
        res.status(400).json(errorResponse(error));
    }
}

module.exports = {
    getAllUser
}