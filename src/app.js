const express = require("express");
var cookieParser = require('cookie-parser')
var cors = require('cors')

const connectDB = require("./config/database")
const { userAuth } = require("./middlewares/userAuth")


const authRouter = require("./routers/authRoutes")
const profileRouter = require("./routers/profileRoutes")
const userRouter = require("./routers/userRoutes")
const requestRouter = require("./routers/requestRoutes")

PORT = 8000;

const app = express();

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
};
app.use(cors(corsOptions));




app.use("/auth", authRouter)
app.use("/profile", userAuth, profileRouter)
app.use("/user", userAuth, userRouter)
app.use("/request", userAuth, requestRouter)


app.use("/", (err, req, res, next) => {
    console.error(err.message)
    res.status(500).send("Something went wrong");
})


connectDB().then(() => {
    console.log("DataBase is Connected Successfully")
    app.listen(PORT, () => {
        console.log(`Backend Server is listening on Port : ${PORT}`);
    })
}).catch((err) => {
    console.error("Not Connected : ", err.message)
})



