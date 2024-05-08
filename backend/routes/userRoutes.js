const express = require("express");
const router = express.Router();
const {
  emailVerification,
  insert,
  signup,
} = require("../controller/userController");

router.route("/insert").post(insert);
router.route("/emailVerification").post(emailVerification);
router.route("/signup").post(signup);

module.exports = router;
