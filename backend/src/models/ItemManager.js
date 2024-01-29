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
      `insert into ${this.table} (name, website, url, price) values (?, ?, ?, ?)`,
      [item.name, item.website, item.url, item.price]
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
}

module.exports = ItemManager;
