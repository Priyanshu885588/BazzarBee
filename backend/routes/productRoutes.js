const express = require("express")
const router = express.Router()
const {getBeautyProducts,getElectronicProduct,getFashonProduct,getHomeProduct} = require("../controller/productController")

router.route("/beauty").get(getBeautyProducts);
router.route("/electronic").get(getElectronicProduct);
router.route("/fashon").get(getFashonProduct);
router.route("/home").get(getHomeProduct);

module.exports = router