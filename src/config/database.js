const mongoose = require("mongoose");


const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://mrkurmi57:AZDl7lUXv79vNye1@namastenode.4dhj1ve.mongodb.net/devTinder",
    )
}


module.exports = connectDB