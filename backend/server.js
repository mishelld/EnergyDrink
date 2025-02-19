const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');  // Import CORS

dotenv.config();

const app = express();
require('dotenv').config();

// **Enable CORS Middleware**
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from your frontend
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization'
}));

// Middleware to parse JSON
app.use(express.json());  

const mongoURI = `mongodb+srv://mish:mish@energy-drink.vx7dt.mongodb.net/?retryWrites=true&w=majority&appName=energy-drink`;

// MongoDB Connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err));

// User Model
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

// Register Route (Sign Up)
app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user and save to DB
        const newUser = new User({
            email,
            password: hashedPassword
        });
        await newUser.save();

        // Respond with success message
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error during registration:', err);  // Log error
        res.status(500).json({ message: 'Server error' });
    }
});

// Login Route (Sign In)
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        // Respond with token
        res.status(200).json({ token });
    } catch (err) {
        console.error('Error during login:', err);  // Fixed error message
        res.status(500).json({ message: 'Server error' });
    }
});


const CartItemSchema = new mongoose.Schema({
    title: String,
    image: String,
    price: Number,
    quantity: { type: Number, default: 1 },
});

const CartSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    items: [CartItemSchema], // An array of cart items
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;

app.post("/api/cart", async (req, res) => {
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
            const existingItem = cart.items.find((cartItem) => cartItem.title === item.title);
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

app.get("/api/cart/:email", async (req, res) => {
    const email = req.params.email;
    try {
        const cart = await Cart.findOne({ email });
        res.json(cart ? cart.items : []);
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// DELETE Route to remove an item from the cart
app.delete("/api/cart/:email/item/:itemId", async (req, res) => {
    const { email, itemId } = req.params;

    try {
        // Find the user's cart by email
        const cart = await Cart.findOne({ email });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Find the index of the item to be deleted
        const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Remove the item from the cart
        cart.items.splice(itemIndex, 1);

        // Save the updated cart
        await cart.save();

        res.status(200).json({ message: 'Item deleted from cart', cart: cart.items });
    } catch (error) {
        console.error('Error deleting item from cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
