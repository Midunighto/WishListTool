// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const wishlists = await tables.wishlist.readAll();

    // Respond with the items in JSON format
    res.json(wishlists);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const user = await tables.wishlist.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
const readByUser = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const wishlist = await tables.wishlist.readByUser(req.params.user_id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (wishlist == null) {
      res.sendStatus(404);
    } else {
      res.json(wishlist);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the item data from the request body
  const wishlist = req.body;

  try {
    // Insert the item into the database
    const insertId = await tables.wishlist.create(wishlist);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ ...req.body, id: insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await tables.wishlist.delete(id);
    if (result.affectedRows === 0) {
      res.status(404).send("id introuvable");
    } else {
      res.status(200).send(`Wishlist ${id} supprimée`);
    }
  } catch (err) {
    next(err);
  }
};
module.exports = {
  browse,
  read,
  readByUser,
  add,
  destroy,
};
