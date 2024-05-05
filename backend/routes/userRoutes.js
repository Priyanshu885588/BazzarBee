const express = require("express")
const router = express.Router()
const {demo,start,insert} = require("../controller/userController")

router.route("/demo").post(demo);
router.route("/start").get(start);
router.route("/insert").post(insert);

module.exports = router