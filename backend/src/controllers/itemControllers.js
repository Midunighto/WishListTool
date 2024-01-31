/* eslint-disable camelcase */
// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const items = await tables.item.readAll();

    // Respond with the items in JSON format
    res.json(items);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const item = await tables.item.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (item == null) {
      res.sendStatus(404);
    } else {
      res.json(item);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const readByWishlist = async (req, res) => {
  try {
    // Appeler la méthode readAll de ItemManager avec user_id
    const items = await tables.item.readByWishlist(
      req.params.user_id,
      req.params.wishlist_id
    );
    if (items.length === 0) {
      res.sendStatus(404);
    } else {
      res.json(items);
    }
  } catch (error) {
    // Gérer les erreurs
    console.error(error);
    res.status(500).send("Erreur lors de la récupération des items");
  }
};
// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented

const edit = async (req, res) => {
  try {
    const result = await tables.item.update(
      req.body.name,
      req.body.website,
      req.body.url,
      req.body.image,
      req.body.price,
      req.params.id
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Une erreur est survenue" });
    }
    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the item data from the request body
  const item = req.body;

  try {
    // Insert the item into the database
    const insertId = await tables.item.create(item);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented
const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await tables.item.delete(id);
    if (result.affectedRows === 0) {
      res.status(404).send("id introuvable");
    } else {
      res.status(200).send(`Item ${id} supprimé`);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  read,
  readByWishlist,
  edit,
  add,
  destroy,
};
