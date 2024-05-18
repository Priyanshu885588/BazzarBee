const Cart = require("../modals/cart");
const User = require("../modals/user");

const addToCart = async (req, res) => {
  const { _id: userId } = req.user;
  const { items, tax } = req.body;
  if (!userId || !items) {
    return res.status(400).json({ msg: "userId and items is needed" });
  }
  try {
    const user = await User.find({ _id: userId });
    if (user.length === 0) {
      return res.status(400).json({ msg: "Invalid userId" });
    }
    const userCart = await Cart.find({ userId: userId });
    if (userCart.length === 0) {
      // Calculate the subtotal
      let subTotal = items.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );

      // Add tax if provided, else use the default tax value 199
      let calculatedTax = tax || 199;
      let total = subTotal + calculatedTax;

      // Update the cart object with subTotal and total
      req.body.userId = userId;
      req.body.subTotal = subTotal;
      req.body.tax = calculatedTax;
      req.body.total = total;
      const updatedUserCart = await Cart.create(req.body);

      return res.status(200).json({
        cart: updatedUserCart,
        msg: "product added to cart successfully",
      });
    } else {
      // Existing cart found, update it with new items
      let existingCart = userCart[0];
      let updatedItems = existingCart.items;
      let existingSubTotal = existingCart.subTotal;

      // Add new items and update the subtotal
      console.log(updatedItems);
      items.forEach((newItem) => {
        console.log(newItem.size);
        const existingItemIndex = updatedItems.findIndex(
          (item) =>
            item.productId == newItem.productId &&
            item.attributes.size == newItem.attributes.size
        );
        console.log(existingItemIndex);
        if (
          existingItemIndex >= 0 &&
          updatedItems[existingItemIndex].attributes.size ==
            newItem.attributes.size
        ) {
          // If the item already exists in the cart, update the quantity and total
          console.log(11);
          updatedItems[existingItemIndex].quantity += newItem.quantity;
          updatedItems[existingItemIndex].total +=
            newItem.quantity * newItem.price;
        } else {
          // If the item is new, add it to the items array
          updatedItems.push(newItem);
        }
        // Update the subtotal
        existingSubTotal += newItem.quantity * newItem.price;
      });

      // Calculate the total
      let calculatedTax = tax || 199;
      let total = existingSubTotal + calculatedTax;

      // Update the existing cart with new values
      existingCart.items = updatedItems;
      existingCart.subTotal = existingSubTotal;
      existingCart.tax = calculatedTax;
      existingCart.total = total;

      // Save the updated cart
      const updatedCart = await existingCart.save();
      return res
        .status(200)
        .json({ cart: updatedCart, msg: "Cart updated successfully" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removeCart = async (req, res) => {
  const { _id: userId } = req.user;
  const { productId, quantity } = req.query;
  try {
    const userCart = await Cart.findOne({ userId });

    if (!userCart) {
      return res.status(404).json({ msg: "Cart not found for this user" });
    }

    // Find index of the product in the items array
    const productIndex = userCart.items.findIndex((item) =>
      item.productId.equals(productId)
    );

    if (productIndex === -1) {
      return res.status(404).json({ msg: "Product not found in the cart" });
    }

    // Reduce the quantity of the product by the specified quantity
    userCart.items[productIndex].quantity -= parseInt(quantity, 10);

    // If the quantity reaches 0, remove the product from the items array
    if (userCart.items[productIndex].quantity <= 0) {
      userCart.items.splice(productIndex, 1);
    }

    // Recalculate subTotal and total
    const subTotal = userCart.items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    const tax = userCart.tax || 199; // default tax if not provided
    const total = subTotal + tax;

    // Update cart with new values
    userCart.subTotal = subTotal;
    userCart.total = total;
    userCart.items.total = total;
    // Save the updated cart
    await userCart.save();

    return res.status(200).json({
      msg: "Product removed from cart successfully",
      userCart: userCart,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCartProducts = async (req, res) => {
  const { _id: userId } = req.user;
  if (!userId) {
    return res.status(400).json({ msg: "userId is needed" });
  }

  try {
    const userCart = await Cart.find({ userId: userId });
    if (userCart.length === 0) {
      return res.status(200).json({ msg: "no products found" });
    }
    const { items, total } = userCart[0];

    res.status(200).json({
      cartItems: items,
      total: total,
      msg: "Products found successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const clearCart = async (req, res) => {
  const { _id: userId } = req.user;
  if (!userId) {
    return res.status(400).json({ msg: "userId is needed" });
  }
  try {
    const userCart = await Cart.deleteOne({ userId: userId });
    if (userCart.length === 0) {
      return res.status(200).json({ msg: "no cart found" });
    }
    res.status(200).json({ msg: "cleared the cart successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addToCart,
  removeCart,
  getAllCartProducts,
  clearCart,
};
