const express = require("express");
const router = express.Router();
const { verifyString, resetPassword,forgetPassword } = require("../Controllers/PasswordControll");


router.post("/forgetPassword",forgetPassword);

router.post("/verifyString", verifyString);


router.post("/PasswordReset/:userString/:userId", resetPassword);



module.exports = router;

