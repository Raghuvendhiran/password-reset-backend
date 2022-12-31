const user = require("../Modules/user");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');




exports.register = async (req, res) => {
    try {
        const payload = req.body;
        if (!payload.Password) {
            return res.status(400).send({ message: "Password is mandatory!" })
        };
        const hashValue = await bcrypt.hash(payload.Password, 10);
        payload.Password = hashValue;
        const newUser = new user(payload);
        await newUser.save((err, data) => {
            if (err) {
                console.log(err);
                return res.status(400).send({ message: "Error While User Registration" })
            }
            res.status(200).send({ UserId: data._id, message: "User has Been Register Successfully" })
        })
    } catch (err) {
        res.status(500).send({ message: "Internal Server Error" })
    }
};


exports.signIn = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        const exitUser = await user.findOne({ Email: Email });
        if (exitUser) {
            const isValidCrend = await bcrypt.compare(Password, exitUser.Password);
            if (isValidCrend) {
                return res.status(200).send({ Message: "User Login Successfully & Password reset link sent to your email account" })
            }
            return res.status(400).send({ message: "Invalid Credentials" })
        }
        res.status(400).send({ message: "User Does Not Exist" })
    } catch (err) {
        res.status(500).send({ message: "Internal Server Error", err });
    }
};



exports.signOut = async (req, res) => {
    try {
        res.status(200).send({ message: "Signed Out Successfully" });

    } catch (err) {    
        res.status(500).send({ message: "Internal Server Error" });
    }
};



