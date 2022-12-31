const express = require("express");
const router = express.Router();

const { getUser, getUserId } = require("../Controllers/UserControlls");

router.get("/Users", getUser);

router.get("/Users/:id", getUserId);






module.exports = router;