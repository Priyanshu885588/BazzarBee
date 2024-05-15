const express = require("express");
const router = express.Router();
const {
    addToCart,
    removeCart,
    getAllCartProducts
} = require("../controller/ordersController")
const auth = require("../middleware/auth")

router.route("/addtocart").post(auth.authenticationMiddleware,addToCart);
router.route("/removeProduct").delete(auth.authenticationMiddleware,removeCart);
router.route("/getcartproducts").get(auth.authenticationMiddleware,getAllCartProducts);

module.exports = router;