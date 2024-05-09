const express = require("express");
const router = express.Router();
const {
  emailVerification,
  insert,
  signup,
  login,
} = require("../controller/userController");

router.route("/insert").post(insert);
router.route("/emailVerification").post(emailVerification);
router.route("/signup").post(signup);
router.route("/login").post(login);

module.exports = router;
