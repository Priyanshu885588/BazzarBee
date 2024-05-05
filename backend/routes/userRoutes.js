const express = require("express")
const router = express.Router()
const {demo,start} = require("../controller/userController")

router.route("/demo").post(demo);
router.route("/start").get(start);

module.exports = router