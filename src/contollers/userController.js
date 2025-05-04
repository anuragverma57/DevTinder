const { validateSignUpData, validateLogInData } = require('../utils/validation')
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
    catch (err) {
        res.status(400).send("Error creating user : " + err.message);
    }
}

module.exports = {
    getAllUser
}