const { validateSignUpData, validateLogInData } = require('../utils/validation')
const User = require("../models/user")
const bcrypt = require('bcrypt');

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

            res.status(200).send("User logged in successfully");
        } else {
            throw new Error("Invalid Credentials");
        }
    } catch (error) {
        res.status(400).send("Error logging user : " + error.message);
    }
}

const signUp = async (req, res) => {
    try {
        // Step 1 - Validation of data - Very Imp Step - NEVER TRUST REQ.BODY
        validateSignUpData(req);

        const { emailId, password, firstName, lastName } = req.body

        // Step 2 - Encrypt the password 
        const hashedPassword = await bcrypt.hash(password, 10);


        // Step 3 - Create an instance of User model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: hashedPassword
        })

        // Step 4 - save user instance to database
        await user.save();

        // Step 5 - send response
        res.send("user Register");
    } catch (err) {
        res.status(400).send("Error creating user : " + err.message);
    }
}


const logOut = async (req, res) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now())
        });
        res.status(200).send("User logged Out successfully");
    } catch (error) {
        res.status(400).send("Error logging out : " + error.message);
    }
}


module.exports = {
    login, signUp, logOut
}