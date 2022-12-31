const express = require("express");
const router = express.Router();

const { register, signIn, signOut } = require("../Controllers/authControll");

router.post("/register", register);

router.post("/signIn", signIn);

router.get("/signOut", signOut);


module.exports = router;