const express = require("express");
const router = express.Router();
const { auth } = require("../../controllers/users");


router.post("/signin", auth.signin);

module.exports = router