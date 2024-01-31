/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class ItemManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "item" as configuration
    super({ table: "item" });
  }

  // The C of CRUD - Create operation

  async create(item) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await this.database.query(
      `insert into ${this.table} (name, website, url, price, user_id, wishlist_id) values (?, ?, ?, ?, ?, ?)`,
      [
        item.name,
        item.website,
        item.url,
        item.price,
        item.used_id,
        item.wishlist_id,
      ]
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [result] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );
    // Return the first row of the result, which represents the item
    return result[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [result] = await this.database.query(`select * from ${this.table}`);

    // Return the array of items
    return result;
  }

  async readByWishlist(user_id, wishlist_id) {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [result] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE user_id = ? AND wishlist_id = ?`,
      [user_id, wishlist_id]
    );

    // Return the array of items
    return result;
  }

  // The U of CRUD - Update operation

  async update(name, website, url, image, price, id) {
    const [result] = await this.database.query(
      `update ${this.table} SET name = ?, website = ?, url = ?, image  = ?, price =  ? where id = ? `,
      [name, website, url, image, price, id]
    );
    return result;
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

module.exports = ItemManager;
