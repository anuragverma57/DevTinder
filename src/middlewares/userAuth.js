const jwt = require('jsonwebtoken')
const User = require('../models/user')

const SECRET_KEY = "DEV@TINDER#12-09-2002"
const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            throw new Error("Token not valid");
        }
        const decodedData = jwt.verify(token, SECRET_KEY)
        const { _id } = decodedData;
        const user = await User.findById(_id);
        if (!user) {
            throw new Error("Login Again");
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(400).send("Error : " + error.message);
    }

}

module.exports = { userAuth }