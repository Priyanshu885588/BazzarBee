const express = require("express");
const router = express.Router();
const {
  addToCart,
  removeCart,
  getAllCartProducts,
  clearCart,
} = require("../controller/ordersController");
const auth = require("../middleware/auth");

router.route("/addtocart").post(auth.authenticationMiddleware, addToCart);
router
  .route("/removeProduct")
  .delete(auth.authenticationMiddleware, removeCart);
router.route("/clearCart").delete(auth.authenticationMiddleware, clearCart);

router
  .route("/getcartproducts")
  .get(auth.authenticationMiddleware, getAllCartProducts);

module.exports = router;
