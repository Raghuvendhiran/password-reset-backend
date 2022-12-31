require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./Db/Mongoose");
db();

const registerRoute = require("./Route/registerRoute");
const userRoute = require("./Route/userRoutes");
const passwordRoute = require("./Route/resetPassword");


app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Welcome to Backend for Password Reset")
});

app.use("/api", registerRoute);
app.use("/api", userRoute);
app.use("/api", passwordRoute);


const PORT = process.env.PORT || 6001;

app.listen(PORT, () => {
    console.log(`App Running on PORT ${PORT}`);
});