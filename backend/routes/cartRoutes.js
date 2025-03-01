const express = require("express");
const Cart = require("../models/Cart");

const router = express.Router();

router.post("/cart", async (req, res) => {
  const { email, item } = req.body;

  if (!email || !item) {
    return res.status(400).json({ message: "Missing user email or item" });
  }

  try {
    let cart = await Cart.findOne({ email });

    if (!cart) {
      cart = new Cart({ email, items: [item] });
    } else {
      // Check if item already exists
      const existingItem = cart.items.find(
        (cartItem) => cartItem.title === item.title
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.items.push({ ...item, quantity: 1 });
      }
    }

    await cart.save();
    res.json({ message: "Item added to cart", cart: cart.items });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/cart/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const cart = await Cart.findOne({ email });
    res.json(cart ? cart.items : []);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/cart/:email/item/:itemId", async (req, res) => {
  const { email, itemId } = req.params;

  try {
    // Find the user's cart by email
    const cart = await Cart.findOne({ email });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the index of the item to be deleted
    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Remove the item from the cart
    cart.items.splice(itemIndex, 1);

    // Save the updated cart
    await cart.save();

    res
      .status(200)
      .json({ message: "Item deleted from cart", cart: cart.items });
  } catch (error) {
    console.error("Error deleting item from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/cart/:email/item/:itemId", async (req, res) => {
  const { email, itemId } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOne({ email });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find((item) => item._id.toString() === itemId);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Update the item’s quantity
    item.quantity = quantity;

    // If quantity is 0, remove the item from the cart
    if (item.quantity === 0) {
      cart.items = cart.items.filter((item) => item._id.toString() !== itemId);
    }

    await cart.save();

    res.status(200).json({ message: "Item updated", cart: cart.items });
  } catch (error) {
    console.error("Error updating item quantity:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/cart/:email/update-details", async (req, res) => {
  const { email } = req.params;
  const { location, serviceType } = req.body;

  try {
    const cart = await Cart.findOne({ email });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Update location and serviceType for all items in the cart
    cart.items.forEach((item) => {
      if (location) item.location = location;
      if (serviceType) item.serviceType = serviceType;
    });

    await cart.save();

    res
      .status(200)
      .json({ message: "Cart details updated successfully", cart: cart.items });
  } catch (error) {
    console.error("Error updating cart details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
