const express = require("express");
const router = express.Router();
const { emailVerification, insert } = require("../controller/userController");

router.route("/insert").post(insert);
router.route("/emailVerification").post(emailVerification);
module.exports = router;
