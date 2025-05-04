const validator = require('validator')

const validateSignUpData = (req) => {
    const { emailId, password, firstName, lastName } = req.body
    if (!firstName || !emailId || !password) {
        throw new Error("firstName, emailId and passwords are mandatory fields")
    }
    else if (!validator.isEmail(emailId)) {
        throw new Error("Invalid Email")
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong Password")
    } else if (firstName.length < 4 || firstName.length > 50) {
        throw new Error("FirstName should be in range 4-50")
    }
}


const validateLogInData = (req) => {
    const { emailId, password } = req.body
    if (!emailId || !password) {
        throw new Error("Enter Email and Password")
    }
    if (!validator.isEmail(emailId)) {
        throw new Error("Invalid Credentials")
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Invalid Credentials")
    }
}

module.exports = { validateSignUpData, validateLogInData }