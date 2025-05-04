const User = require("../models/user")


const getUserProfile = async (req, res) => {
    try {
        const user = req.user
        res.send(user);
    }
    catch (err) {
        res.status(400).send("Error Finding user : " + err.message);
    }
}

const updateUser = async (req, res) => {

    const data = req.body
    const user = req.user
    const ALLOWED_FIELDS = [
        "skills",
        "age",
        "password",
        "firstName",
        "lastName",
        "gender",
    ]

    try {

        const isUpdateAllowed = Object.keys(data).every((e) => ALLOWED_FIELDS.includes(e)
        );

        if (!isUpdateAllowed) {
            throw new Error("Some field cant be changed");
        }


        const newData = await User.findByIdAndUpdate(user._id, data, {
            returnDocument: 'after',
            runValidators: true
        });
        res.send({ "UpdatedUser": newData })
    } catch (err) {
        res.status(400).send("Error Updating user : " + err.message);
    }
}

module.exports = {
    getUserProfile, updateUser
}