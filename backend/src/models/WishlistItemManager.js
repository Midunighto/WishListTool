/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class WishlistItemManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "item" as configuration
    super({ table: "wishlistItem" });
  }

  // The C of CRUD - Create operation

  async create(wishlistItem) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await this.database.query(
      `insert into ${this.table} (wishlist_id, item_id ) values (?, ?)`,
      [wishlistItem.wishlist_id, wishlistItem.item_id]
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [result] = await this.database.query(`select * from ${this.table}`);

    // Return the array of items
    return result;
  }

  async read(wishlist_id) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [result] = await this.database.query(
      `select * from ${this.table} where wishlist_id = ?`,
      [wishlist_id]
    );

    // Return the first row of the result, which represents the item
    return result;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an item by its ID

  async delete(wishlist_id) {
    const [result] = await this.database.query(
      `delete * from ${this.table} where wishlist_id = ?`,
      [wishlist_id]
    );
    return result;
  }
}

module.exports = WishlistItemManager;
