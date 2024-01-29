const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const userControllers = require("./controllers/userControllers");

// Route to get a list of items
router.get("/users", userControllers.browse);

// Route to get a specific item by ID
router.get("/users/:id", userControllers.read);

// Route to add a new item
router.post("/users", userControllers.add);

/* ************************************************************************* */
const wishlistControllers = require("./controllers/wishlistControllers");

router.get("/wishlists", wishlistControllers.browse);

// Route to get a specific item by ID
router.get("/wishlists/:id", wishlistControllers.read);

// Route to add a new item
router.post("/wishlists", wishlistControllers.add);
/* ************************************************************************* */
const itemControllers = require("./controllers/itemControllers");

router.get("/items", itemControllers.browse);

// Route to get a specific item by ID
router.get("/items/:id", itemControllers.read);

// Route to add a new item
router.post("/items", itemControllers.add);
/* ************************************************************************* */
const wishlistItemControllers = require("./controllers/wishlistItemControllers");

router.get("/wishlistItems", wishlistItemControllers.browse);

// Route to get a specific item by ID
router.get("/wishlistItems/:id", wishlistItemControllers.read);

// Route to add a new item
router.post("/wishlistItems", wishlistItemControllers.add);

module.exports = router;
