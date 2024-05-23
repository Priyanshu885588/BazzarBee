const express = require("express");
const router = express.Router();
const {
  addToCart,
  removeCart,
  getAllCartProducts,
  clearCart,
  storeUserAddress,
  createCheckout,
  fetchUserAddress,
  addUserAddress,
  checkoutSession
} = require("../controller/ordersController");
const auth = require("../middleware/auth");

router.route("/addtocart").post(auth.authenticationMiddleware, addToCart);
router
  .route("/addtocheckout")
  .post(auth.authenticationMiddleware, createCheckout);

router
  .route("/removeProduct")
  .delete(auth.authenticationMiddleware, removeCart);
router.route("/clearCart").delete(auth.authenticationMiddleware, clearCart);

router
  .route("/getcartproducts")
  .get(auth.authenticationMiddleware, getAllCartProducts);

router.route("/address").post(auth.authenticationMiddleware, storeUserAddress);

router.route("/fetchuseraddress").get(auth.authenticationMiddleware,fetchUserAddress);

router.route("/adduseraddress").post(auth.authenticationMiddleware,addUserAddress);

router.route("/checkout-session").post(auth.authenticationMiddleware,checkoutSession);

module.exports = router;
