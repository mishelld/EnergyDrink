const express = require("express");

const userRoutes = require("./userRoutes");
const cartRoutes = require("./cartRoutes");
const orderRoutes = require("./orderRoutes");

const router = express.Router();

router.use("", userRoutes); // No prefix
router.use("", cartRoutes); // No prefix
router.use("", orderRoutes); // No prefix

module.exports = router;
