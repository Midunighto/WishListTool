const express = require("express");
const multer = require("multer");

const uploadFile = require("./services/multer");

const router = express.Router();

/* const upload = multer({ dest: "public/assets/images" }); */
/* ************************************************************************* */
const userControllers = require("./controllers/userControllers");
const signup = require("./services/signup");
const { hashPassword, verifyPassword } = require("./services/hashPwd");
const { checkToken } = require("./services/jwt");

// Route to get a list of items
router.get("/users", userControllers.browse);

// Route to get a specific item by ID
router.get("/users/:id", userControllers.read);

// Route to add a new user
router.post("/users", signup, hashPassword, userControllers.add);

router.put("/users/:id/addtheme", userControllers.editTheme);

router.post("/login", verifyPassword, userControllers.login);
router.get("/protected", checkToken, userControllers.refreshToken);
router.get("/logout", userControllers.logout);
/* ************************************************************************* */
const wishlistControllers = require("./controllers/wishlistControllers");

router.get("/wishlists", wishlistControllers.browse);

// Route to get a specific item by ID
router.get("/wishlists/:id", wishlistControllers.read);
// get wishlist by user id
router.get("/users/:user_id/wishlists", wishlistControllers.readByUser);

// Route to add a new item
router.post("/wishlists/", wishlistControllers.add);

router.delete("/wishlists/:id", wishlistControllers.destroy);
/* ************************************************************************* */
const itemControllers = require("./controllers/itemControllers");

router.get("/items", itemControllers.browse);

// Route to get a specific item by ID
router.get("/items/:id", itemControllers.read);

// Route to get a specific item by wishlist_ID
router.get(
  "/users/:user_id/wishlists/:wishlist_id/items/",
  itemControllers.readByWishlist
);

// Route to add a new item
router.post("/items", uploadFile.single("image"), itemControllers.add);
/* router.post("/items/image ", upload.single("image"), itemControllers.editImage); */
/* router.post("/items/image ", uploadFile.single("image"), itemControllers.editImage); */

router.put("/items/:id", uploadFile.single("image"), itemControllers.edit);

router.delete("/items/:id", itemControllers.destroy);

/* ************************************************************************* */

module.exports = router;
