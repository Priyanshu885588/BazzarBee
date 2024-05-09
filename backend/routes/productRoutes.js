const express = require("express")
const router = express.Router()
const {getBeautyProducts,getElectronicProduct,getFashonProduct,getHomeProduct,addRating} = require("../controller/productController")

router.route("/beauty").get(getBeautyProducts);
router.route("/electronic").get(getElectronicProduct);
router.route("/fashon").get(getFashonProduct);
router.route("/home").get(getHomeProduct);
router.route("/rating").post(addRating);

module.exports = router