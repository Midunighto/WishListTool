/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class WishlistManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "item" as configuration
    super({ table: "wishlist" });
  }

  // The C of CRUD - Create operation

  async create(wishlist) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await this.database.query(
      `insert into ${this.table} (name, user_id) values (?, ?)`,
      [wishlist.name, wishlist.user_id]
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [result] = await this.database.query(`select * from ${this.table}`);

    // Return the array of items
    return result;
  }

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the item
    return rows[0];
  }

  async readByUser(user_id) {
    // Execute the SQL SELECT query to retrieve wishlists by user_id
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE user_id = ?`,
      [user_id]
    );
    // Return the rows of the result, which represents the wishlists
    return rows;
  }
  // The D of CRUD - Delete operation

  async delete(id) {
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );
    return result;
  }
}

module.exports = WishlistManager;
