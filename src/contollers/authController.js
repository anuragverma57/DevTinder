const { validateSignUpData, validateLogInData } = require('../utils/validation')
const User = require("../models/user")
const bcrypt = require('bcrypt');

const { errorResponse, successResponse } = require("../utils/response");
const { log } = require('console');
const { sanitizeUser } = require('../utils/sanitization');

const login = async (req, res) => {
    try {
        validateLogInData(req)
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId })
        if (!user) {
            throw new Error("Invalid Credentials");
        }
        const isCorrectPassword = await user.validatePassword(password);
        if (isCorrectPassword) {
            // Create a JWT token
            const token = await user.getJWT();
            // Setting the token in res
            res.cookie("token", token, { expires: new Date(Date.now() + (7 * 24 * 3600000)) }); // 7 days

            const sanitizedUser = sanitizeUser(user)
            res.status(200).json(successResponse(sanitizedUser));
        } else {
            throw new Error("Invalid Credentials");
        }
    } catch (error) {
        res.status(400).json(errorResponse(error));
    }
}

const signUp = async (req, res) => {
    try {
        validateSignUpData(req);

        const { emailId, password, firstName, lastName } = req.body

        const isAlreadyPresent = await User.findOne({ emailId });
        if (isAlreadyPresent) {
            throw new Error("This Email is already in use, Try using another email")
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: hashedPassword
        })

        // Step 4 - save user instance to database
        let newUser = await user.save();


        const sanitizedUser = sanitizeUser(newUser);

        // Step 5 - send response
        res.json(successResponse(sanitizedUser));
    } catch (error) {
        res.status(400).json(errorResponse(error));
    }
}


const logOut = async (req, res) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now())
        });
        res.status(200).json("User logged Out successfully");
    } catch (error) {
        res.status(400).json(errorResponse(error));
    }
}


module.exports = {
    login, signUp, logOut
}