const StringModule = require("../Modules/String");
const addString = require("../Modules/String");
const user = require("../Modules/user");
const bcrypt = require("bcrypt");
const sendEmail = require("../Utils/sendEmail");
const crypto = require('crypto');


exports.forgetPassword = async (req, res) => {
    try {
        const { Email } = req.body;
        const exitUser = await user.findOne({ Email: Email });
        if (exitUser) {
            const generateString = await new addString({
                String: crypto.randomBytes(32).toString("hex"),
            }).save();
            const PasswordReset = `${process.env.FRONT_BASE_URL}/PasswordReset/${generateString.String}/${exitUser._id}`;
            const StringReset = `${process.env.FRONT_BASE_URL}/verifyString`;
            const isSent = await sendEmail(exitUser.Email, "Password_reset", PasswordReset, StringReset, `${generateString.String}`);
            return res.status(200).send({ message: "Reset link sent to your email account" })
        }
        res.status(400).send({ message: "User Does Not Exist" })
    } catch (err) {
        res.status(500).send({ message: "Internal Server Error", err });
    }
};


exports.verifyString = async (req, res) => {
    try {
        const { String } = req.body;
        const Verify = await StringModule.findOne({ String: String });
        if (Verify) {
            const Data = (Verify.String === String);
            if (Data) {

                return res.status(200).send({ message: "String Matched & Please Reset Your Password" });
            } else {
                res.status(400).send({ message: "String Not Matched" });
            }
        } else {
            res.status(400).send({ message: "String Not Available" });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { Password } = req.body;
        const { userId, userString } = req.params;
        const existUser = await user.findOne({ _id: userId });
        if (existUser) {
            const hashValue = await bcrypt.hash(Password, 10);
            const stringempty = await StringModule.deleteOne({ String: userString });
            user.findByIdAndUpdate({ _id: existUser._id }, { $set: { Password: hashValue } }, (err, data) => {
                if (err) {
                    return res.status(400).send({ message: "Error while updating an employee." })
                }
                return res.status(200).send({ message: 'Password Reset successfully.', stringempty })
            })
        } else {
            res.status(400).send({ message: 'Invalid Id' })
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error });
    }
};



